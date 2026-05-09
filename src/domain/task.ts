export const DEFAULT_TIMER_SECONDS = 180;
export const SNOOZE_SECONDS = 180;
export const TIMER_PRESETS = [
  { label: '10 s', seconds: 10 },
  { label: '1 min', seconds: 60 },
  { label: '3 min', seconds: DEFAULT_TIMER_SECONDS },
] as const;

export type TaskStatus = 'active' | 'due' | 'done';

export type TaskThread = {
  id: string;
  title: string;
  createdAt: number;
  dueAt: number;
  durationSeconds: number;
  snoozeCount: number;
  status: TaskStatus;
};

export function createTaskThread(
  title: string,
  durationSeconds: number,
  now: number = Date.now(),
): TaskThread {
  return {
    id: `${now}-${Math.random().toString(36).slice(2, 8)}`,
    title: title.trim(),
    createdAt: now,
    dueAt: now + durationSeconds * 1000,
    durationSeconds,
    snoozeCount: 0,
    status: 'active',
  };
}

export function formatRemainingTime(task: TaskThread, now: number = Date.now()) {
  if (task.status === 'done') {
    return 'Zamknięte';
  }

  const totalSeconds = Math.max(0, Math.ceil((task.dueAt - now) / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
