"use client";

import { useSyncExternalStore } from "react";

import {
  defaultSettings,
  settingsChangeEvent,
  settingsStorageKey,
  type AppSettings,
} from "@/lib/adapters/settings";

export function loadAppSettings() {
  if (typeof window === "undefined") {
    return defaultSettings;
  }

  try {
    const storedSettings = window.localStorage.getItem(settingsStorageKey);

    return storedSettings
      ? ({ ...defaultSettings, ...JSON.parse(storedSettings) } as AppSettings)
      : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveAppSettings(settings: AppSettings) {
  window.localStorage.setItem(settingsStorageKey, JSON.stringify(settings));
  window.dispatchEvent(new Event(settingsChangeEvent));
}

export function getRefreshIntervalMs(settings: AppSettings) {
  const seconds = Number(settings.refreshInterval);

  return seconds > 0 ? seconds * 1000 : false;
}

function subscribe(callback: () => void) {
  window.addEventListener(settingsChangeEvent, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(settingsChangeEvent, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return JSON.stringify(loadAppSettings());
}

export function useAppSettings() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => JSON.stringify(defaultSettings),
  );

  return JSON.parse(snapshot) as AppSettings;
}
