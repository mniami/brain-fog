import { useEffect, useMemo, useState } from 'react';

import {
  createTaskThread,
  DEFAULT_TIMER_SECONDS,
  type TaskStatus,
  type TaskThread,
  TIMER_PRESETS,
  SNOOZE_SECONDS,
} from '../domain/task';

const ONE_MINUTE_MS = 60_000;
const FAST_TICK_INTERVAL_MS = 1_000;
const SLOW_TICK_INTERVAL_MS = 5_000;

function syncTaskStatuses(tasks: TaskThread[], now: number) {
  let changed = false;

  const nextTasks = tasks.map((task) => {
    if (task.status === 'done') {
      return task;
    }

    const nextStatus: TaskStatus = task.dueAt <= now ? 'due' : 'active';

    if (nextStatus === task.status) {
      return task;
    }

    changed = true;
    return {
      ...task,
      status: nextStatus,
    };
  });

  return changed ? nextTasks : tasks;
}

export function useBrainFogApp() {
  const [draft, setDraft] = useState('');
  const [selectedDurationSeconds, setSelectedDurationSeconds] = useState<number>(DEFAULT_TIMER_SECONDS);
  const [tasks, setTasks] = useState<TaskThread[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const hasOpenTasks = tasks.some((task) => task.status !== 'done');
  const nearestDueInMs = hasOpenTasks
    ? Math.min(
        ...tasks
          .filter((task) => task.status !== 'done')
          .map((task) => Math.max(0, task.dueAt - now)),
      )
    : 0;
  const tickIntervalMs =
    nearestDueInMs <= ONE_MINUTE_MS ? FAST_TICK_INTERVAL_MS : SLOW_TICK_INTERVAL_MS;

  useEffect(() => {
    if (!hasOpenTasks) {
      return;
    }

    const interval = setInterval(() => {
      const currentTime = Date.now();
      setNow(currentTime);
      setTasks((currentTasks) => syncTaskStatuses(currentTasks, currentTime));
    }, tickIntervalMs);

    return () => clearInterval(interval);
  }, [hasOpenTasks, tickIntervalMs]);

  const activeTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.status !== 'done')
        .sort((left, right) => left.dueAt - right.dueAt),
    [tasks],
  );

  const completedTasks = useMemo(
    () =>
      tasks
        .filter((task) => task.status === 'done')
        .sort((left, right) => right.createdAt - left.createdAt),
    [tasks],
  );

  const addTask = () => {
    const title = draft.trim();

    if (!title) {
      return;
    }

    setTasks((currentTasks) => [
      createTaskThread(title, selectedDurationSeconds),
      ...currentTasks,
    ]);
    setDraft('');
    setSelectedDurationSeconds(DEFAULT_TIMER_SECONDS);
  };

  const completeTask = (taskId: string) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: 'done',
            }
          : task,
      ),
    );
  };

  const snoozeTask = (taskId: string) => {
    const snoozeFrom = Date.now();

    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              dueAt: snoozeFrom + SNOOZE_SECONDS * 1000,
              status: 'active',
              snoozeCount: task.snoozeCount + 1,
            }
          : task,
      ),
    );
  };

  return {
    draft,
    setDraft,
    selectedDurationSeconds,
    setSelectedDurationSeconds,
    timerPresets: TIMER_PRESETS,
    activeTasks,
    completedTasks,
    addTask,
    completeTask,
    snoozeTask,
    now,
  };
}
