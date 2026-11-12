"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/** True when the user is typing, so shortcuts must not fire. */
export function isTyping(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
}

/** Lets "[" and "]" jump to the previous and next component. */
export function KeyboardNav({
  previousHref,
  nextHref,
}: {
  previousHref?: string;
  nextHref?: string;
}) {
  const router = useRouter();

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTyping(event.target)) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key === "[" && previousHref) router.push(previousHref);
      if (event.key === "]" && nextHref) router.push(nextHref);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router, previousHref, nextHref]);

  return null;
}
