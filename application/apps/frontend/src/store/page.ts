import { create } from "zustand";

const useDataStore = create<{ nodes: string[] }>((set) => ({
  nodes: [],
  add: (num: string) => set((state) => ({ nodes: [...state.nodes, num] })),
}));

export default useDataStore;
