import { type FormEvent, useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassPanel } from "@/components/gomarch/glass-panel";
import { APP_NAME, SYSTEM_NAME } from "@/lib/vault";
import { useVault } from "@/lib/vault-store";
import { cn } from "@/lib/utils";

export function GateScreen() {
  const submitGate = useVault((s) => s.submitGate);
  const notice = useVault((s) => s.notice);
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const result = submitGate(value);
    if (result === "empty") {
      setShake(true);
      window.setTimeout(() => setShake(false), 300);
    }
  }

  return (
    <GlassPanel className={cn("w-full max-w-md", shake && "shake")}>
      <p className="rise text-xs font-medium tracking-[0.32em] text-muted uppercase">
        {SYSTEM_NAME}
      </p>
      <h1 className="font-display rise-2 mt-3 text-5xl leading-none tracking-tight text-fg">
        {APP_NAME}
      </h1>
      <p className="rise-3 mt-4 text-sm leading-relaxed text-muted">
        Private recovery vault. Enter the phrase to unseal the glass.
      </p>

      <form className="rise-4 mt-8 space-y-4" onSubmit={onSubmit} autoComplete="off">
        <label className="block text-xs font-medium tracking-[0.16em] text-subtle uppercase">
          Vault phrase
        </label>
        <div className="glass-input flex items-center rounded-lg pr-1">
          <KeyRound className="ml-4 size-4 shrink-0 text-muted" strokeWidth={1.6} />
          <Input
            name="gomarch-gate"
            type={show ? "text" : "password"}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Enter phrase"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Vault phrase"
          />
          <button
            type="button"
            className="mr-1 flex size-10 items-center justify-center rounded-md text-muted hover:text-fg"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide phrase" : "Show phrase"}
          >
            {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {notice ? (
          <p className="text-sm text-danger" role="alert">
            {notice}
          </p>
        ) : null}
        <Button type="submit" className="w-full rounded-lg" size="lg">
          Unseal
        </Button>
      </form>
    </GlassPanel>
  );
}
