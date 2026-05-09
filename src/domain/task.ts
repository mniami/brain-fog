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

function fallbackUuid() {
  if (typeof globalThis.crypto?.getRandomValues === 'function') {
    const bytes = globalThis.crypto.getRandomValues(new Uint8Array(16));
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0'));

    return [
      hex.slice(0, 4).join(''),
      hex.slice(4, 6).join(''),
      hex.slice(6, 8).join(''),
      hex.slice(8, 10).join(''),
      hex.slice(10, 16).join(''),
    ].join('-');
  }

  return `${nowFallback()}-${Math.random().toString(36).slice(2, 10)}`;
}

function nowFallback() {
  return Date.now();
}

export function createTaskThread(
  title: string,
  durationSeconds: number,
  now: number = Date.now(),
): TaskThread {
  const id =
    typeof globalThis.crypto?.randomUUID === 'function'
      ? globalThis.crypto.randomUUID()
      : fallbackUuid();

  return {
    id,
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

export function formatDurationLabel(durationSeconds: number) {
  if (durationSeconds < 60) {
    return `${durationSeconds} sek.`;
  }

  const minutes = Math.round(durationSeconds / 60);
  return `${Math.max(1, minutes)} min.`;
}
