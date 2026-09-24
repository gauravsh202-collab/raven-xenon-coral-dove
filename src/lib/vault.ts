export const APP_NAME = "Gomarch";
export const SYSTEM_NAME = "Gomark";

export const GATE_PHRASE = "go march";
export const INNER_KEY = "123456";
export const UNLOCK_KEY = "password";

export const LOCK_MS_GATE = 60 * 60 * 1000;
export const LOCK_MS_INNER = 2 * 60 * 60 * 1000;
export const LOCK_MS_UNLOCK = 24 * 60 * 60 * 1000;

export const STORAGE_LOCK_UNTIL = "gomarch.lockUntil";
export const STORAGE_LOCK_HOURS = "gomarch.lockHours";
export const STORAGE_GATE = "gomarch.gateOpen";

export type AccountId = "first" | "second" | "both";
export type LockHours = 1 | 2 | 24;

export type VaultAccount = {
  id: Exclude<AccountId, "both">;
  email: string;
  secret: string;
  label: string;
};

export const ACCOUNTS: VaultAccount[] = [
  {
    id: "first",
    email: "grjangid12@gmail.com",
    secret: "Madhav!0604",
    label: "First",
  },
  {
    id: "second",
    email: "gaurav.sh202@gmail.com",
    secret: "Madhav!0604",
    label: "Second",
  },
];

export function normalizeGate(value: string) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export function gateMatches(value: string) {
  return normalizeGate(value) === GATE_PHRASE;
}

export function innerMatches(value: string) {
  return value.trim() === INNER_KEY;
}

export function unlockMatches(value: string) {
  return value.trim().toLowerCase() === UNLOCK_KEY;
}

export function lockDurationMs(hours: LockHours) {
  if (hours === 24) return LOCK_MS_UNLOCK;
  if (hours === 2) return LOCK_MS_INNER;
  return LOCK_MS_GATE;
}

export function lockHoursLabel(hours: LockHours) {
  if (hours === 24) return "24 hours";
  if (hours === 2) return "two hours";
  return "one hour";
}

export function accountsFor(id: AccountId): VaultAccount[] {
  if (id === "both") return ACCOUNTS;
  return ACCOUNTS.filter((account) => account.id === id);
}

export function readLock(): { until: number; hours: LockHours } | null {
  if (typeof window === "undefined") return null;
  const untilRaw = window.localStorage.getItem(STORAGE_LOCK_UNTIL);
  if (!untilRaw) return null;
  const until = Number(untilRaw);
  if (!Number.isFinite(until) || until <= Date.now()) {
    clearLock();
    return null;
  }
  const hoursRaw = Number(window.localStorage.getItem(STORAGE_LOCK_HOURS));
  const hours: LockHours = hoursRaw === 24 ? 24 : hoursRaw === 2 ? 2 : 1;
  return { until, hours };
}

export function writeLock(ms: number, hours: LockHours) {
  const until = Date.now() + ms;
  window.localStorage.setItem(STORAGE_LOCK_UNTIL, String(until));
  window.localStorage.setItem(STORAGE_LOCK_HOURS, String(hours));
  window.sessionStorage.removeItem(STORAGE_GATE);
  return until;
}

export function clearLock() {
  window.localStorage.removeItem(STORAGE_LOCK_UNTIL);
  window.localStorage.removeItem(STORAGE_LOCK_HOURS);
}

export function readGateOpen() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(STORAGE_GATE) === "1";
}

export function writeGateOpen(open: boolean) {
  if (open) window.sessionStorage.setItem(STORAGE_GATE, "1");
  else window.sessionStorage.removeItem(STORAGE_GATE);
}

export function formatRemaining(until: number, now = Date.now()) {
  const total = Math.max(0, until - now);
  const hours = Math.floor(total / 3_600_000);
  const minutes = Math.floor((total % 3_600_000) / 60_000);
  const seconds = Math.floor((total % 60_000) / 1000);
  return {
    hours,
    minutes,
    seconds,
    label: [hours, minutes, seconds]
      .map((part) => String(part).padStart(2, "0"))
      .join(":"),
  };
}
