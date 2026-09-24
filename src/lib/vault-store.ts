import { create } from "zustand";
import {
  type AccountId,
  type LockHours,
  clearLock,
  gateMatches,
  innerMatches,
  lockDurationMs,
  readGateOpen,
  readLock,
  unlockMatches,
  writeGateOpen,
  writeLock,
} from "@/lib/vault";

export type VaultView = "gate" | "home" | "recover" | "reveal";

type VaultState = {
  hydrated: boolean;
  view: VaultView;
  gateOpen: boolean;
  lockedUntil: number | null;
  lockHours: LockHours | null;
  selected: AccountId | null;
  notice: string | null;
  hydrate: () => void;
  tick: () => void;
  submitGate: (password: string) => "ok" | "empty" | "locked";
  openRecover: () => void;
  chooseAccount: (id: AccountId) => void;
  submitInner: (password: string) => "ok" | "empty" | "locked";
  submitUnlock: (password: string) => "ok" | "empty" | "locked";
  seal: () => void;
  backHome: () => void;
  clearNotice: () => void;
};

function applyLock(set: (partial: Partial<VaultState>) => void, hours: LockHours) {
  const until = writeLock(lockDurationMs(hours), hours);
  set({
    lockedUntil: until,
    lockHours: hours,
    gateOpen: false,
    view: "gate",
    selected: null,
    notice: null,
  });
}

export const useVault = create<VaultState>((set, get) => ({
  hydrated: false,
  view: "gate",
  gateOpen: false,
  lockedUntil: null,
  lockHours: null,
  selected: null,
  notice: null,

  hydrate: () => {
    const lock = readLock();
    const gateOpen = !lock && readGateOpen();
    set({
      hydrated: true,
      lockedUntil: lock?.until ?? null,
      lockHours: lock?.hours ?? null,
      gateOpen,
      view: gateOpen ? "home" : "gate",
      selected: null,
      notice: null,
    });
  },

  tick: () => {
    const { lockedUntil } = get();
    if (!lockedUntil) return;
    if (Date.now() >= lockedUntil) {
      clearLock();
      set({
        lockedUntil: null,
        lockHours: null,
        view: "gate",
        gateOpen: false,
        selected: null,
      });
    }
  },

  submitGate: (password) => {
    if (get().lockedUntil && Date.now() < (get().lockedUntil ?? 0)) return "locked";
    if (!password.trim()) {
      set({ notice: "Enter the vault phrase." });
      return "empty";
    }
    if (!gateMatches(password)) {
      applyLock(set, 1);
      return "locked";
    }
    writeGateOpen(true);
    set({
      gateOpen: true,
      view: "home",
      notice: null,
      selected: null,
    });
    return "ok";
  },

  openRecover: () => {
    if (!get().gateOpen) return;
    set({ view: "recover", selected: null, notice: null });
  },

  chooseAccount: (id) => {
    set({ selected: id, notice: null });
  },

  submitInner: (password) => {
    if (get().lockedUntil && Date.now() < (get().lockedUntil ?? 0)) return "locked";
    if (!get().selected) {
      set({ notice: "Choose an account first." });
      return "empty";
    }
    if (!password.trim()) {
      set({ notice: "Enter the inner key." });
      return "empty";
    }
    if (!innerMatches(password)) {
      applyLock(set, 2);
      return "locked";
    }
    set({ view: "reveal", notice: null });
    return "ok";
  },

  submitUnlock: (password) => {
    const { lockedUntil } = get();
    if (!lockedUntil || Date.now() >= lockedUntil) return "ok";
    if (!password.trim()) {
      set({ notice: "Enter the unlock password." });
      return "empty";
    }
    if (!unlockMatches(password)) {
      applyLock(set, 24);
      return "locked";
    }
    clearLock();
    writeGateOpen(false);
    set({
      lockedUntil: null,
      lockHours: null,
      gateOpen: false,
      view: "gate",
      selected: null,
      notice: null,
    });
    return "ok";
  },

  seal: () => {
    writeGateOpen(false);
    set({
      gateOpen: false,
      view: "gate",
      selected: null,
      notice: null,
    });
  },

  backHome: () => {
    set({ view: "home", selected: null, notice: null });
  },

  clearNotice: () => set({ notice: null }),
}));
