"use client";

/**
 * পাঠ-সম্পূর্ণ হওয়ার হিসাব localStorage-এ —
 * hydration-নিরাপদ external store-এর মাধ্যমে সব কম্পোনেন্ট শেয়ার করে।
 */

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "express-shikhi-progress";

const EMPTY: string[] = [];
let cache: string[] = EMPTY;

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    if (Array.isArray(parsed)) {
      const list = parsed.filter((x): x is string => typeof x === "string");
      if (JSON.stringify(list) !== JSON.stringify(cache)) {
        cache = list;
      }
    }
  } catch {
    if (cache !== EMPTY) cache = EMPTY;
  }
  return cache;
}

function serverRead(): string[] {
  return EMPTY;
}

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function write(next: string[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable — in-memory only
  }
  listeners.forEach((l) => l());
}

export function toggleCompleted(id: string) {
  const current = read();
  write(
    current.includes(id) ? current.filter((x) => x !== id) : [...current, id]
  );
}

export function useCompletedLessons(): string[] {
  return useSyncExternalStore(subscribe, read, serverRead);
}

export function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
