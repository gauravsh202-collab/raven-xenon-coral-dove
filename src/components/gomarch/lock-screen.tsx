import { type FormEvent, useEffect, useState } from "react";
import { Eye, EyeOff, KeyRound, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassPanel } from "@/components/gomarch/glass-panel";
import { APP_NAME, formatRemaining, lockHoursLabel, type LockHours } from "@/lib/vault";
import { useVault } from "@/lib/vault-store";
import { cn } from "@/lib/utils";

export function LockScreen({ until, hours }: { until: number; hours: LockHours }) {
  const submitUnlock = useVault((s) => s.submitUnlock);
  const notice = useVault((s) => s.notice);
  const [now, setNow] = useState(() => Date.now());
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);

  const remaining = formatRemaining(until, now);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const result = submitUnlock(value);
    if (result === "empty") {
      setShake(true);
      window.setTimeout(() => setShake(false), 300);
    }
    setValue("");
  }

  return (
    <GlassPanel className={cn("w-full max-w-md text-center", shake && "shake")}>
      <div className="rise mx-auto flex size-12 items-center justify-center rounded-lg bg-glass/10 text-fg">
        <Lock className="size-5" strokeWidth={1.5} />
      </div>
      <p className="rise-2 mt-5 text-xs font-medium tracking-[0.28em] text-muted uppercase">
        {APP_NAME} sealed
      </p>
      <h1 className="font-display rise-3 mt-2 text-3xl leading-tight text-fg">
        Locked for {lockHoursLabel(hours)}
      </h1>
      <p className="rise-4 mt-3 text-sm leading-relaxed text-muted">
        Stays sealed if you leave. Wait the timer, or unlock now.
      </p>
      <p
        className="mt-5 font-display text-4xl tabular-nums tracking-tight text-fg"
        aria-live="polite"
      >
        {remaining.label}
      </p>
      <p className="mt-2 text-xs tracking-[0.18em] text-subtle uppercase">
        Hours · minutes · seconds
      </p>

      <form className="mt-6 space-y-3 text-left" onSubmit={onSubmit} autoComplete="off">
        <label className="block text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Unlock password
        </label>
        <div className="glass-input flex items-center rounded-lg pr-1">
          <KeyRound className="ml-4 size-4 shrink-0 text-muted" strokeWidth={1.6} />
          <Input
            name="gomarch-unlock"
            type={show ? "text" : "password"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter unlock password"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Unlock password"
          />
          <button
            type="button"
            className="mr-1 flex size-10 items-center justify-center rounded-md text-muted hover:text-fg"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {notice ? (
          <p className="text-sm text-danger" role="alert">
            {notice}
          </p>
        ) : (
          <p className="text-sm text-muted">
            A wrong unlock password locks Gomarch for 24 hours.
          </p>
        )}
        <Button type="submit" className="w-full rounded-lg" size="lg">
          Unlock
        </Button>
      </form>
    </GlassPanel>
  );
}
