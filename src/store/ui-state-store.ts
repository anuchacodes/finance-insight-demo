import { create } from "zustand";

export type UiStateKey =
  | "dashboard"
  | "historical-chart"
  | "exchange-rates-table"
  | "watchlist"
  | "converter";

type StateMessage = {
  title: string;
  description?: string;
};

type UiStateStore = {
  empty: Partial<Record<UiStateKey, StateMessage>>;
  errors: Partial<Record<UiStateKey, StateMessage>>;
  loading: Partial<Record<UiStateKey, boolean>>;
  clearState: (key: UiStateKey) => void;
  resetUiState: () => void;
  setEmpty: (key: UiStateKey, value?: StateMessage) => void;
  setError: (key: UiStateKey, value?: StateMessage) => void;
  setLoading: (key: UiStateKey, value: boolean) => void;
};

function withoutKey<T>(record: Partial<Record<UiStateKey, T>>, key: UiStateKey) {
  return Object.fromEntries(
    Object.entries(record).filter(([stateKey]) => stateKey !== key),
  ) as Partial<Record<UiStateKey, T>>;
}

export const useUiStateStore = create<UiStateStore>((set) => ({
  empty: {},
  errors: {},
  loading: {},
  clearState: (key) =>
    set((state) => ({
      empty: withoutKey(state.empty, key),
      errors: withoutKey(state.errors, key),
      loading: withoutKey(state.loading, key),
    })),
  resetUiState: () => set({ empty: {}, errors: {}, loading: {} }),
  setEmpty: (key, value) =>
    set((state) => ({
      empty: value
        ? { ...state.empty, [key]: value }
        : withoutKey(state.empty, key),
    })),
  setError: (key, value) =>
    set((state) => ({
      errors: value
        ? { ...state.errors, [key]: value }
        : withoutKey(state.errors, key),
    })),
  setLoading: (key, value) =>
    set((state) => ({
      loading: { ...state.loading, [key]: value },
    })),
}));
