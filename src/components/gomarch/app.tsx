import { useEffect } from "react";
import { LiquidStage } from "@/components/gomarch/liquid-stage";
import { GateScreen } from "@/components/gomarch/gate-screen";
import { LockScreen } from "@/components/gomarch/lock-screen";
import { RecoverFlow } from "@/components/gomarch/recover-flow";
import { VaultHome } from "@/components/gomarch/vault-home";
import { APP_NAME } from "@/lib/vault";
import { useVault } from "@/lib/vault-store";

export function GomarchApp() {
  const hydrated = useVault((s) => s.hydrated);
  const hydrate = useVault((s) => s.hydrate);
  const tick = useVault((s) => s.tick);
  const lockedUntil = useVault((s) => s.lockedUntil);
  const lockHours = useVault((s) => s.lockHours);
  const view = useVault((s) => s.view);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    const id = window.setInterval(() => tick(), 500);
    return () => window.clearInterval(id);
  }, [tick]);

  const locked = Boolean(
    hydrated && lockedUntil && lockHours && Date.now() < lockedUntil,
  );

  return (
    <LiquidStage>
      <main className="flex min-h-dvh flex-col items-center justify-center px-4 py-6 sm:px-6">
        <p className="mb-6 text-[11px] tracking-[0.38em] text-subtle uppercase">
          {APP_NAME}
        </p>
        {locked && lockedUntil && lockHours ? (
          <LockScreen until={lockedUntil} hours={lockHours} />
        ) : !hydrated || view === "gate" ? (
          <GateScreen />
        ) : view === "home" ? (
          <VaultHome />
        ) : (
          <RecoverFlow />
        )}
      </main>
    </LiquidStage>
  );
}
