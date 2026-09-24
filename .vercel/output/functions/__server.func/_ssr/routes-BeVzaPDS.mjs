import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as KeyRound, c as Copy, i as Lock, l as Check, n as Shield, o as Eye, r as Mail, s as EyeOff } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BeVzaPDS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LiquidStage({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "liquid-stage",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				className: "pointer-events-none absolute size-0",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("filter", {
					id: "gomarch-goo",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("feGaussianBlur", {
						in: "SourceGraphic",
						stdDeviation: "28",
						result: "blur"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feColorMatrix", {
						in: "blur",
						mode: "matrix",
						values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10",
						result: "goo"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "liquid-core",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "liquid-blob liquid-blob-a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "liquid-blob liquid-blob-b" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "liquid-blob liquid-blob-c" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "liquid-veil",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10",
				children
			})
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium select-none outline-none disabled:pointer-events-none disabled:opacity-40 transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out active:not-disabled:scale-[0.96] min-h-11", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg shadow-[0_1px_0_color-mix(in_oklab,white_28%,transparent)_inset] hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-glass/10",
			glass: "glass glass-compact text-fg hover:bg-glass/10",
			danger: "bg-danger text-fg hover:opacity-90"
		},
		size: {
			md: "h-12 px-5 text-sm rounded-md",
			lg: "h-12 px-6 text-sm rounded-lg",
			icon: "size-11 rounded-md px-0"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
var Button = (0, import_react.forwardRef)(function Button({ className, variant, size, type = "button", ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		ref,
		type,
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
});
var Input = (0, import_react.forwardRef)(function Input({ className, ...props }, ref) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		ref,
		suppressHydrationWarning: true,
		className: cn("h-12 w-full rounded-md bg-transparent px-4 text-base text-fg outline-none placeholder:text-subtle", className),
		...props
	});
});
function GlassPanel({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("glass rounded-2xl p-6 sm:p-8", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative z-10",
			children
		})
	});
}
var APP_NAME = "Gomarch";
var SYSTEM_NAME = "Gomark";
var GATE_PHRASE = "go march";
var INNER_KEY = "123456";
var UNLOCK_KEY = "password";
var LOCK_MS_GATE = 36e5;
var LOCK_MS_INNER = 72e5;
var LOCK_MS_UNLOCK = 864e5;
var STORAGE_LOCK_UNTIL = "gomarch.lockUntil";
var STORAGE_LOCK_HOURS = "gomarch.lockHours";
var STORAGE_GATE = "gomarch.gateOpen";
var ACCOUNTS = [{
	id: "first",
	email: "grjangid12@gmail.com",
	secret: "Madhav!0604",
	label: "First"
}, {
	id: "second",
	email: "gaurav.sh202@gmail.com",
	secret: "Madhav!0604",
	label: "Second"
}];
function normalizeGate(value) {
	return value.trim().replace(/\s+/g, " ").toLowerCase();
}
function gateMatches(value) {
	return normalizeGate(value) === GATE_PHRASE;
}
function innerMatches(value) {
	return value.trim() === INNER_KEY;
}
function unlockMatches(value) {
	return value.trim().toLowerCase() === UNLOCK_KEY;
}
function lockDurationMs(hours) {
	if (hours === 24) return LOCK_MS_UNLOCK;
	if (hours === 2) return LOCK_MS_INNER;
	return LOCK_MS_GATE;
}
function lockHoursLabel(hours) {
	if (hours === 24) return "24 hours";
	if (hours === 2) return "two hours";
	return "one hour";
}
function accountsFor(id) {
	if (id === "both") return ACCOUNTS;
	return ACCOUNTS.filter((account) => account.id === id);
}
function readLock() {
	if (typeof window === "undefined") return null;
	const untilRaw = window.localStorage.getItem(STORAGE_LOCK_UNTIL);
	if (!untilRaw) return null;
	const until = Number(untilRaw);
	if (!Number.isFinite(until) || until <= Date.now()) {
		clearLock();
		return null;
	}
	const hoursRaw = Number(window.localStorage.getItem(STORAGE_LOCK_HOURS));
	return {
		until,
		hours: hoursRaw === 24 ? 24 : hoursRaw === 2 ? 2 : 1
	};
}
function writeLock(ms, hours) {
	const until = Date.now() + ms;
	window.localStorage.setItem(STORAGE_LOCK_UNTIL, String(until));
	window.localStorage.setItem(STORAGE_LOCK_HOURS, String(hours));
	window.sessionStorage.removeItem(STORAGE_GATE);
	return until;
}
function clearLock() {
	window.localStorage.removeItem(STORAGE_LOCK_UNTIL);
	window.localStorage.removeItem(STORAGE_LOCK_HOURS);
}
function readGateOpen() {
	if (typeof window === "undefined") return false;
	return window.sessionStorage.getItem(STORAGE_GATE) === "1";
}
function writeGateOpen(open) {
	if (open) window.sessionStorage.setItem(STORAGE_GATE, "1");
	else window.sessionStorage.removeItem(STORAGE_GATE);
}
function formatRemaining(until, now = Date.now()) {
	const total = Math.max(0, until - now);
	const hours = Math.floor(total / 36e5);
	const minutes = Math.floor(total % 36e5 / 6e4);
	const seconds = Math.floor(total % 6e4 / 1e3);
	return {
		hours,
		minutes,
		seconds,
		label: [
			hours,
			minutes,
			seconds
		].map((part) => String(part).padStart(2, "0")).join(":")
	};
}
function applyLock(set, hours) {
	set({
		lockedUntil: writeLock(lockDurationMs(hours), hours),
		lockHours: hours,
		gateOpen: false,
		view: "gate",
		selected: null,
		notice: null
	});
}
var useVault = create((set, get) => ({
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
			notice: null
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
				selected: null
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
			selected: null
		});
		return "ok";
	},
	openRecover: () => {
		if (!get().gateOpen) return;
		set({
			view: "recover",
			selected: null,
			notice: null
		});
	},
	chooseAccount: (id) => {
		set({
			selected: id,
			notice: null
		});
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
		set({
			view: "reveal",
			notice: null
		});
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
			notice: null
		});
		return "ok";
	},
	seal: () => {
		writeGateOpen(false);
		set({
			gateOpen: false,
			view: "gate",
			selected: null,
			notice: null
		});
	},
	backHome: () => {
		set({
			view: "home",
			selected: null,
			notice: null
		});
	},
	clearNotice: () => set({ notice: null })
}));
function GateScreen() {
	const submitGate = useVault((s) => s.submitGate);
	const notice = useVault((s) => s.notice);
	const [value, setValue] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [shake, setShake] = (0, import_react.useState)(false);
	function onSubmit(event) {
		event.preventDefault();
		if (submitGate(value) === "empty") {
			setShake(true);
			window.setTimeout(() => setShake(false), 300);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: cn("w-full max-w-md", shake && "shake"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise text-xs font-medium tracking-[0.32em] text-muted uppercase",
				children: SYSTEM_NAME
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display rise-2 mt-3 text-5xl leading-none tracking-tight text-fg",
				children: APP_NAME
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-3 mt-4 text-sm leading-relaxed text-muted",
				children: "Private recovery vault. Enter the phrase to unseal the glass."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "rise-4 mt-8 space-y-4",
				onSubmit,
				autoComplete: "off",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-medium tracking-[0.16em] text-subtle uppercase",
						children: "Vault phrase"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-input flex items-center rounded-lg pr-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
								className: "ml-4 size-4 shrink-0 text-muted",
								strokeWidth: 1.6
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "gomarch-gate",
								type: show ? "text" : "password",
								value,
								onChange: (event) => setValue(event.target.value),
								placeholder: "Enter phrase",
								autoCapitalize: "off",
								autoCorrect: "off",
								spellCheck: false,
								"aria-label": "Vault phrase"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mr-1 flex size-10 items-center justify-center rounded-md text-muted hover:text-fg",
								onClick: () => setShow((v) => !v),
								"aria-label": show ? "Hide phrase" : "Show phrase",
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})
						]
					}),
					notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						role: "alert",
						children: notice
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full rounded-lg",
						size: "lg",
						children: "Unseal"
					})
				]
			})
		]
	});
}
function LockScreen({ until, hours }) {
	const submitUnlock = useVault((s) => s.submitUnlock);
	const notice = useVault((s) => s.notice);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [value, setValue] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [shake, setShake] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 250);
		return () => window.clearInterval(id);
	}, []);
	const remaining = formatRemaining(until, now);
	function onSubmit(event) {
		event.preventDefault();
		if (submitUnlock(value) === "empty") {
			setShake(true);
			window.setTimeout(() => setShake(false), 300);
		}
		setValue("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: cn("w-full max-w-md text-center", shake && "shake"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rise mx-auto flex size-12 items-center justify-center rounded-lg bg-glass/10 text-fg",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {
					className: "size-5",
					strokeWidth: 1.5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rise-2 mt-5 text-xs font-medium tracking-[0.28em] text-muted uppercase",
				children: [APP_NAME, " sealed"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "font-display rise-3 mt-2 text-3xl leading-tight text-fg",
				children: ["Locked for ", lockHoursLabel(hours)]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-4 mt-3 text-sm leading-relaxed text-muted",
				children: "Stays sealed if you leave. Wait the timer, or unlock now."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 font-display text-4xl tabular-nums tracking-tight text-fg",
				"aria-live": "polite",
				children: remaining.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs tracking-[0.18em] text-subtle uppercase",
				children: "Hours · minutes · seconds"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-3 text-left",
				onSubmit,
				autoComplete: "off",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-medium tracking-[0.16em] text-subtle uppercase",
						children: "Unlock password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-input flex items-center rounded-lg pr-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
								className: "ml-4 size-4 shrink-0 text-muted",
								strokeWidth: 1.6
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "gomarch-unlock",
								type: show ? "text" : "password",
								value,
								onChange: (event) => setValue(event.target.value),
								placeholder: "Enter unlock password",
								autoCapitalize: "off",
								autoCorrect: "off",
								spellCheck: false,
								"aria-label": "Unlock password"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mr-1 flex size-10 items-center justify-center rounded-md text-muted hover:text-fg",
								onClick: () => setShow((v) => !v),
								"aria-label": show ? "Hide password" : "Show password",
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})
						]
					}),
					notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						role: "alert",
						children: notice
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "A wrong unlock password locks Gomarch for 24 hours."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full rounded-lg",
						size: "lg",
						children: "Unlock"
					})
				]
			})
		]
	});
}
var TABS = [
	{
		id: "first",
		title: "First",
		hint: ACCOUNTS[0].email
	},
	{
		id: "second",
		title: "Second",
		hint: ACCOUNTS[1].email
	},
	{
		id: "both",
		title: "Both",
		hint: "Reveal both secrets"
	}
];
function RecoverFlow() {
	const view = useVault((s) => s.view);
	const selected = useVault((s) => s.selected);
	const notice = useVault((s) => s.notice);
	const chooseAccount = useVault((s) => s.chooseAccount);
	const submitInner = useVault((s) => s.submitInner);
	const backHome = useVault((s) => s.backHome);
	const seal = useVault((s) => s.seal);
	const [key, setKey] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [shake, setShake] = (0, import_react.useState)(false);
	function onSubmit(event) {
		event.preventDefault();
		if (submitInner(key) === "empty") {
			setShake(true);
			window.setTimeout(() => setShake(false), 300);
		}
		setKey("");
	}
	if (view === "reveal" && selected) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RevealCard, {
		accountId: selected,
		onHome: backHome,
		onSeal: seal
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: cn("w-full max-w-lg", shake && "shake"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise text-xs font-medium tracking-[0.22em] text-muted uppercase",
				children: "Recovery"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display rise-2 mt-3 text-3xl leading-tight text-fg sm:text-4xl",
				children: "Which account are you searching for?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-3 mt-3 text-sm leading-relaxed text-muted",
				children: "Open a tab, then enter the inner key to reveal that Gmail password."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rise-4 mt-6 grid grid-cols-3 gap-2 rounded-xl bg-glass/5 p-1.5",
				role: "tablist",
				"aria-label": "Accounts",
				children: TABS.map((tab) => {
					const active = selected === tab.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						role: "tab",
						"aria-selected": active,
						onClick: () => {
							chooseAccount(tab.id);
							setKey("");
						},
						className: cn("min-h-14 rounded-lg px-2 py-2 text-center transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96]", active ? "bg-accent text-accent-fg" : "text-muted hover:text-fg"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-medium",
							children: tab.title
						})
					}, tab.id);
				})
			}),
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-6 space-y-4",
				onSubmit,
				autoComplete: "off",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-sm text-muted",
						children: TABS.find((tab) => tab.id === selected)?.hint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "block text-xs font-medium tracking-[0.16em] text-subtle uppercase",
						children: "Inner key"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "glass-input flex items-center rounded-lg pr-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
								className: "ml-4 size-4 shrink-0 text-muted",
								strokeWidth: 1.6
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								name: "gomarch-inner",
								type: show ? "text" : "password",
								value: key,
								onChange: (event) => setKey(event.target.value),
								placeholder: "Enter inner key",
								autoCapitalize: "off",
								autoCorrect: "off",
								spellCheck: false,
								inputMode: "numeric",
								"aria-label": "Inner key"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mr-1 flex size-10 items-center justify-center rounded-md text-muted hover:text-fg",
								onClick: () => setShow((v) => !v),
								"aria-label": show ? "Hide key" : "Show key",
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})
						]
					}),
					notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						role: "alert",
						children: notice
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full rounded-lg",
						size: "lg",
						children: "Reveal password"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-sm text-muted",
				children: "Choose a tab to continue."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				className: "mt-3 w-full",
				onClick: backHome,
				children: "Back to vault"
			})
		]
	});
}
function RevealCard({ accountId, onHome, onSeal }) {
	const accounts = accountsFor(accountId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: "w-full max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise text-xs font-medium tracking-[0.22em] text-muted uppercase",
				children: "Secrets"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display rise-2 mt-3 text-3xl leading-tight text-fg",
				children: "Gmail passwords"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-3 mt-3 text-sm text-muted",
				children: "Copy once, then seal the vault."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rise-4 mt-6 space-y-3",
				children: accounts.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecretRow, {
					email: account.email,
					secret: account.secret
				}, account.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "w-full rounded-lg",
					onClick: onHome,
					children: "Done"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					className: "w-full",
					onClick: onSeal,
					children: "Seal vault"
				})]
			})
		]
	});
}
function SecretRow({ email, secret }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	async function copy() {
		try {
			await navigator.clipboard.writeText(secret);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			setCopied(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "glass-compact rounded-xl p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tracking-[0.16em] text-subtle uppercase",
				children: "Account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 truncate text-sm text-fg",
				children: email
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-wide break-all text-fg",
					children: secret
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "glass",
					size: "icon",
					className: "shrink-0 rounded-lg",
					onClick: copy,
					"aria-label": copied ? "Copied" : "Copy password",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-ok" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" })
				})]
			})
		]
	});
}
function VaultHome() {
	const openRecover = useVault((s) => s.openRecover);
	const seal = useVault((s) => s.seal);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GlassPanel, {
		className: "w-full max-w-lg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 items-center justify-center rounded-md bg-glass/10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shield, {
						className: "size-5",
						strokeWidth: 1.5
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-[0.22em] text-muted uppercase",
					children: "Vault open"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl leading-tight text-fg",
					children: APP_NAME
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rise-2 mt-5 text-sm leading-relaxed text-muted",
				children: "Two Google accounts are held here. If you forget a Gmail password, recover it from this vault."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "rise-3 mt-6 space-y-2",
				children: ACCOUNTS.map((account) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "glass-compact flex items-center gap-3 rounded-lg px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
						className: "size-4 text-muted",
						strokeWidth: 1.6
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[11px] tracking-[0.16em] text-subtle uppercase",
							children: [account.label, " account"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm text-fg",
							children: account.email
						})]
					})]
				}, account.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rise-4 mt-8 flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					className: "w-full rounded-lg",
					size: "lg",
					onClick: openRecover,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KeyRound, {
						className: "size-4",
						strokeWidth: 1.7
					}), "Forget the password"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					className: "w-full",
					onClick: seal,
					children: "Seal vault"
				})]
			})
		]
	});
}
function GomarchApp() {
	const hydrated = useVault((s) => s.hydrated);
	const hydrate = useVault((s) => s.hydrate);
	const tick = useVault((s) => s.tick);
	const lockedUntil = useVault((s) => s.lockedUntil);
	const lockHours = useVault((s) => s.lockHours);
	const view = useVault((s) => s.view);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => tick(), 500);
		return () => window.clearInterval(id);
	}, [tick]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiquidStage, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center px-4 py-6 sm:px-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-6 text-[11px] tracking-[0.38em] text-subtle uppercase",
			children: APP_NAME
		}), Boolean(hydrated && lockedUntil && lockHours && Date.now() < lockedUntil) && lockedUntil && lockHours ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockScreen, {
			until: lockedUntil,
			hours: lockHours
		}) : !hydrated || view === "gate" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GateScreen, {}) : view === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VaultHome, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecoverFlow, {})]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GomarchApp, {});
}
//#endregion
export { Home as component };
