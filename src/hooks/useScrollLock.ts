import { useEffect } from "react";
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    const original = window.getComputedStyle(document.body).overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => { document.body.style.overflow = original; document.body.style.paddingRight = ""; };
  }, [locked]);
}
