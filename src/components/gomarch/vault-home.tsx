import { KeyRound, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlassPanel } from "@/components/gomarch/glass-panel";
import { ACCOUNTS, APP_NAME } from "@/lib/vault";
import { useVault } from "@/lib/vault-store";

export function VaultHome() {
  const openRecover = useVault((s) => s.openRecover);
  const seal = useVault((s) => s.seal);

  return (
    <GlassPanel className="w-full max-w-lg">
      <div className="rise flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-md bg-glass/10">
          <Shield className="size-5" strokeWidth={1.5} />
        </span>
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-muted uppercase">
            Vault open
          </p>
          <h1 className="font-display text-3xl leading-tight text-fg">{APP_NAME}</h1>
        </div>
      </div>

      <p className="rise-2 mt-5 text-sm leading-relaxed text-muted">
        Two Google accounts are held here. If you forget a Gmail password, recover
        it from this vault.
      </p>

      <ul className="rise-3 mt-6 space-y-2">
        {ACCOUNTS.map((account) => (
          <li
            key={account.id}
            className="glass-compact flex items-center gap-3 rounded-lg px-4 py-3"
          >
            <Mail className="size-4 text-muted" strokeWidth={1.6} />
            <div className="min-w-0">
              <p className="text-[11px] tracking-[0.16em] text-subtle uppercase">
                {account.label} account
              </p>
              <p className="truncate text-sm text-fg">{account.email}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="rise-4 mt-8 flex flex-col gap-3">
        <Button type="button" className="w-full rounded-lg" size="lg" onClick={openRecover}>
          <KeyRound className="size-4" strokeWidth={1.7} />
          Forget the password
        </Button>
        <Button type="button" variant="ghost" className="w-full" onClick={seal}>
          Seal vault
        </Button>
      </div>
    </GlassPanel>
  );
}
