"use client";

import { useSyncExternalStore } from "react";

import {
  defaultWatchlistQuotes,
  watchlistChangeEvent,
  watchlistStorageKey,
  type WatchlistQuote,
} from "@/lib/adapters/watchlist";

function normalizeWatchlistQuotes(value: unknown): WatchlistQuote[] {
  if (!Array.isArray(value)) {
    return defaultWatchlistQuotes;
  }

  const quotes = Array.from(
    new Set(
      value.filter(
        (quote): quote is WatchlistQuote =>
          typeof quote === "string" && quote.trim().length > 0,
      ),
    ),
  );

  return quotes;
}

function emitWatchlistChange() {
  window.dispatchEvent(new Event(watchlistChangeEvent));
}

function getServerSnapshot() {
  return JSON.stringify(defaultWatchlistQuotes);
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(watchlistChangeEvent, onStoreChange);
  window.addEventListener("storage", onStoreChange);

  return () => {
    window.removeEventListener(watchlistChangeEvent, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

export function loadWatchlistQuotes(): WatchlistQuote[] {
  if (typeof window === "undefined") {
    return defaultWatchlistQuotes;
  }

  const rawValue = window.localStorage.getItem(watchlistStorageKey);

  if (!rawValue) {
    return defaultWatchlistQuotes;
  }

  try {
    return normalizeWatchlistQuotes(JSON.parse(rawValue));
  } catch {
    return defaultWatchlistQuotes;
  }
}

function getSnapshot() {
  return JSON.stringify(loadWatchlistQuotes());
}

export function saveWatchlistQuotes(quotes: WatchlistQuote[]) {
  const normalizedQuotes = normalizeWatchlistQuotes(quotes);

  window.localStorage.setItem(
    watchlistStorageKey,
    JSON.stringify(normalizedQuotes),
  );
  emitWatchlistChange();

  return normalizedQuotes;
}

export function addWatchlistQuote(quote: WatchlistQuote) {
  const quotes = loadWatchlistQuotes();

  if (quotes.includes(quote)) {
    return quotes;
  }

  return saveWatchlistQuotes([...quotes, quote]);
}

export function removeWatchlistQuote(quote: WatchlistQuote) {
  const quotes = loadWatchlistQuotes();

  return saveWatchlistQuotes(quotes.filter((item) => item !== quote));
}

export function useWatchlistQuotes() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return JSON.parse(snapshot) as WatchlistQuote[];
}
