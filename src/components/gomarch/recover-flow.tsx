import { type FormEvent, useState } from "react";
import { Check, Copy, Eye, EyeOff, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassPanel } from "@/components/gomarch/glass-panel";
import { ACCOUNTS, accountsFor, type AccountId } from "@/lib/vault";
import { useVault } from "@/lib/vault-store";
import { cn } from "@/lib/utils";

const TABS: { id: AccountId; title: string; hint: string }[] = [
  { id: "first", title: "First", hint: ACCOUNTS[0].email },
  { id: "second", title: "Second", hint: ACCOUNTS[1].email },
  { id: "both", title: "Both", hint: "Reveal both secrets" },
];

export function RecoverFlow() {
  const view = useVault((s) => s.view);
  const selected = useVault((s) => s.selected);
  const notice = useVault((s) => s.notice);
  const chooseAccount = useVault((s) => s.chooseAccount);
  const submitInner = useVault((s) => s.submitInner);
  const backHome = useVault((s) => s.backHome);
  const seal = useVault((s) => s.seal);
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const [shake, setShake] = useState(false);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const result = submitInner(key);
    if (result === "empty") {
      setShake(true);
      window.setTimeout(() => setShake(false), 300);
    }
    setKey("");
  }

  if (view === "reveal" && selected) {
    return <RevealCard accountId={selected} onHome={backHome} onSeal={seal} />;
  }

  return (
    <GlassPanel className={cn("w-full max-w-lg", shake && "shake")}>
      <p className="rise text-xs font-medium tracking-[0.22em] text-muted uppercase">
        Recovery
      </p>
      <h1 className="font-display rise-2 mt-3 text-3xl leading-tight text-fg sm:text-4xl">
        Which account are you searching for?
      </h1>
      <p className="rise-3 mt-3 text-sm leading-relaxed text-muted">
        Open a tab, then enter the inner key to reveal that Gmail password.
      </p>

      <div
        className="rise-4 mt-6 grid grid-cols-3 gap-2 rounded-xl bg-glass/5 p-1.5"
        role="tablist"
        aria-label="Accounts"
      >
        {TABS.map((tab) => {
          const active = selected === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => {
                chooseAccount(tab.id);
                setKey("");
              }}
              className={cn(
                "min-h-14 rounded-lg px-2 py-2 text-center transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96]",
                active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              <span className="block text-sm font-medium">{tab.title}</span>
            </button>
          );
        })}
      </div>

      {selected ? (
        <form className="mt-6 space-y-4" onSubmit={onSubmit} autoComplete="off">
          <p className="text-center text-sm text-muted">
            {TABS.find((tab) => tab.id === selected)?.hint}
          </p>
          <label className="block text-xs font-medium tracking-[0.16em] text-subtle uppercase">
            Inner key
          </label>
          <div className="glass-input flex items-center rounded-lg pr-1">
            <KeyRound className="ml-4 size-4 shrink-0 text-muted" strokeWidth={1.6} />
            <Input
              name="gomarch-inner"
              type={show ? "text" : "password"}
              value={key}
              onChange={(event) => setKey(event.target.value)}
              placeholder="Enter inner key"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              inputMode="numeric"
              aria-label="Inner key"
            />
            <button
              type="button"
              className="mr-1 flex size-10 items-center justify-center rounded-md text-muted hover:text-fg"
              onClick={() => setShow((v) => !v)}
              aria-label={show ? "Hide key" : "Show key"}
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
            Reveal password
          </Button>
        </form>
      ) : (
        <p className="mt-6 text-center text-sm text-muted">Choose a tab to continue.</p>
      )}

      <Button type="button" variant="ghost" className="mt-3 w-full" onClick={backHome}>
        Back to vault
      </Button>
    </GlassPanel>
  );
}

function RevealCard({
  accountId,
  onHome,
  onSeal,
}: {
  accountId: AccountId;
  onHome: () => void;
  onSeal: () => void;
}) {
  const accounts = accountsFor(accountId);

  return (
    <GlassPanel className="w-full max-w-lg">
      <p className="rise text-xs font-medium tracking-[0.22em] text-muted uppercase">
        Secrets
      </p>
      <h1 className="font-display rise-2 mt-3 text-3xl leading-tight text-fg">
        Gmail passwords
      </h1>
      <p className="rise-3 mt-3 text-sm text-muted">Copy once, then seal the vault.</p>

      <ul className="rise-4 mt-6 space-y-3">
        {accounts.map((account) => (
          <SecretRow key={account.id} email={account.email} secret={account.secret} />
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3">
        <Button type="button" className="w-full rounded-lg" onClick={onHome}>
          Done
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={onSeal}>
          Seal vault
        </Button>
      </div>
    </GlassPanel>
  );
}

function SecretRow({ email, secret }: { email: string; secret: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(secret);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <li className="glass-compact rounded-xl p-4">
      <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">Account</p>
      <p className="mt-1 truncate text-sm text-fg">{email}</p>
      <div className="mt-4 flex items-center justify-between gap-3">
        <p className="font-display text-2xl tracking-wide break-all text-fg">{secret}</p>
        <Button
          type="button"
          variant="glass"
          size="icon"
          className="shrink-0 rounded-lg"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy password"}
        >
          {copied ? <Check className="size-4 text-ok" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </li>
  );
}
