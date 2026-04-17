"use client";

import { useEffect, useRef } from "react";
import { track } from "@vercel/analytics";

type CallLocation = "hero" | "closing" | "sticky" | "header";

export function CallLink({
  location,
  phone,
  phoneDisplay,
  className,
  ariaLabel,
  children,
}: {
  location: CallLocation;
  phone: string;
  phoneDisplay?: string;
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={`tel:${phone}`}
      aria-label={ariaLabel}
      className={className}
      onClick={() =>
        track("call_click", {
          location,
          phone: phoneDisplay ?? phone,
        })
      }
    >
      {children}
    </a>
  );
}

export function SessionTracker() {
  useEffect(() => {
    track("session_start", {
      referrer: document.referrer || "direct",
      path: window.location.pathname,
    });
  }, []);
  return null;
}

export function ScrollDepthTracker() {
  useEffect(() => {
    const fired = new Set<number>();
    const thresholds = [25, 50, 75, 100];
    function onScroll() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      if (total <= 0) return;
      const pct = Math.round((h.scrollTop / total) * 100);
      for (const t of thresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track("scroll_depth", { percent: t });
        }
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return null;
}

export function SectionView({
  name,
  threshold = 0.4,
  children,
}: {
  name: string;
  threshold?: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            track("section_view", { section: name });
            io.disconnect();
            return;
          }
        }
      },
      { threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name, threshold]);
  return <div ref={ref}>{children}</div>;
}
