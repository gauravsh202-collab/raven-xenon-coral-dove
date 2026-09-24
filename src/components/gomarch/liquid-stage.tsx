import type { ReactNode } from "react";

export function LiquidStage({ children }: { children: ReactNode }) {
  return (
    <div className="liquid-stage">
      <svg className="pointer-events-none absolute size-0" aria-hidden="true">
        <filter id="gomarch-goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="28" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10"
            result="goo"
          />
        </filter>
      </svg>
      <div className="liquid-core" aria-hidden="true">
        <span className="liquid-blob liquid-blob-a" />
        <span className="liquid-blob liquid-blob-b" />
        <span className="liquid-blob liquid-blob-c" />
      </div>
      <div className="liquid-veil" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
