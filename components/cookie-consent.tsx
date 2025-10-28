"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "autoflow.cookie-consent";
const OPEN_EVENT = "autoflow:cookie-consent-open";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

type DraftConsent = Pick<ConsentState, "analytics" | "marketing">;

const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  updatedAt: "",
};

function readStoredConsent(): ConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<ConsentState> | null;
    if (!parsed || parsed.necessary !== true) {
      return null;
    }

    return {
      necessary: true,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : "",
    };
  } catch (error) {
    console.warn("无法读取 Cookie 同意状态：", error);
    return null;
  }
}

function persistConsent(state: ConsentState) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    window.dispatchEvent(new CustomEvent("autoflow:cookie-consent-change", { detail: state }));
  } catch (error) {
    console.warn("无法写入 Cookie 同意状态：", error);
  }
}

export function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT_CONSENT);
  const [showBanner, setShowBanner] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [draft, setDraft] = useState<DraftConsent>({
    analytics: DEFAULT_CONSENT.analytics,
    marketing: DEFAULT_CONSENT.marketing,
  });

  useEffect(() => {
    const stored = readStoredConsent();
    if (stored) {
      setConsent(stored);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  useEffect(() => {
    function handleOpen() {
      setDraft({ analytics: consent.analytics, marketing: consent.marketing });
      setPreferencesOpen(true);
      setShowBanner(false);
    }

    window.addEventListener(OPEN_EVENT, handleOpen);
    return () => {
      window.removeEventListener(OPEN_EVENT, handleOpen);
    };
  }, [consent]);

  useEffect(() => {
    if (!preferencesOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [preferencesOpen]);

  const applyConsent = useCallback((next: DraftConsent) => {
    const result: ConsentState = {
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      updatedAt: new Date().toISOString(),
    };
    setConsent(result);
    persistConsent(result);
    setPreferencesOpen(false);
    setShowBanner(false);
  }, []);

  const handleAcceptAll = useCallback(() => {
    applyConsent({ analytics: true, marketing: true });
  }, [applyConsent]);

  const handleRejectAll = useCallback(() => {
    applyConsent({ analytics: false, marketing: false });
  }, [applyConsent]);

  const handleOpenPreferences = useCallback(() => {
    setDraft({ analytics: consent.analytics, marketing: consent.marketing });
    setPreferencesOpen(true);
  }, [consent.analytics, consent.marketing]);

  const handleClosePreferences = useCallback(() => {
    setPreferencesOpen(false);
    if (!readStoredConsent()) {
      setShowBanner(true);
    }
  }, []);

  const bannerVisible = useMemo(
    () => showBanner && !preferencesOpen,
    [showBanner, preferencesOpen],
  );

  return (
    <>
      {bannerVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="mx-auto max-w-3xl rounded-2xl border border-neutral-200 bg-white/95 p-6 shadow-xl backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95">
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  Cookie 使用说明
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  我们会使用必要的 Cookie 保证站点正常运行；若您同意，也会使用分析 Cookie
                  帮助我们了解内容表现。您可以随时在偏好设置中修改选择。
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600"
                >
                  仅使用必要 Cookie
                </button>
                <button
                  type="button"
                  onClick={handleOpenPreferences}
                  className="rounded-lg border border-transparent px-4 py-2 text-sm font-medium text-neutral-700 underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-200 dark:hover:text-white"
                >
                  设置偏好
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
                >
                  同意全部 Cookie
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {preferencesOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-neutral-900/40 backdrop-blur"
            onClick={handleClosePreferences}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            className="relative z-10 w-full max-w-xl rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h2
                  id="cookie-preferences-title"
                  className="text-lg font-semibold text-neutral-900 dark:text-white"
                >
                  Cookie 偏好设置
                </h2>
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                  根据类别选择是否允许我们收集额外的数据。必要 Cookie
                  将始终启用，以保障站点的基础功能。
                </p>
              </div>
              <button
                type="button"
                onClick={handleClosePreferences}
                className="rounded-full border border-transparent p-1 text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                aria-label="关闭"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <div className="mt-6 space-y-4">
              <section className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4 dark:border-neutral-700 dark:bg-neutral-800/60">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                      必要 Cookie
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300/80">
                      用于记住登录状态、保存您的隐私设置等关键站点功能，无法被关闭。
                    </p>
                  </div>
                  <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-700/60 dark:text-neutral-200">
                    始终启用
                  </span>
                </div>
              </section>

              <label className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    分析 Cookie
                  </span>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300/80">
                    帮助我们统计页面浏览量与事件，了解不同内容的表现，优化产品体验。
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.analytics}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, analytics: event.target.checked }))
                  }
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:border-neutral-600 dark:bg-neutral-800"
                />
              </label>

              <label className="flex items-start justify-between gap-4 rounded-xl border border-neutral-200 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-700 dark:hover:border-neutral-600">
                <div className="space-y-1">
                  <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                    营销 Cookie
                  </span>
                  <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300/80">
                    用于个性化推荐和活动通知，目前仅在订阅邮件中使用，帮助我们发送与您更相关的更新。
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={draft.marketing}
                  onChange={(event) =>
                    setDraft((current) => ({ ...current, marketing: event.target.checked }))
                  }
                  className="mt-1 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 dark:border-neutral-600 dark:bg-neutral-800"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleClosePreferences}
                className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:hover:border-neutral-600"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => applyConsent(draft)}
                className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-200"
              >
                保存偏好
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookiePreferencesTrigger({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  const handleClick = useCallback(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.dispatchEvent(new Event(OPEN_EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={
        className ??
        "text-sm font-medium text-neutral-600 underline underline-offset-4 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
      }
    >
      {children ?? "管理 Cookie 偏好"}
    </button>
  );
}
