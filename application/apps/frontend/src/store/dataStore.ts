import { create } from "zustand";
import { NodeElement } from "../types/node";
import { v4 as uuidv4 } from "uuid";

const useDataStore = create<{
  nodes: NodeElement[];
  getMainNodes: () => string[];
  addNewNode: () => void;
  updateNode: (node: NodeElement, newContent: string) => void;
}>((set, get) => ({
  nodes: [
    {
      id: "1",
      content: "some element",
      element: "div",
    },
    {
      id: "2",
      content: "nested some element",
      element: "h1",
    },
  ],
  getMainNodes: () => {
    const n = get();
    return n.nodes.map((k) => k.id);
  },
  addNewNode: () => {
    const node: NodeElement = {
      id: uuidv4(),
      content: "",
      element: "div",
    };
    const n = get();
    const m = [...n.nodes, node];
    set(() => ({ nodes: m }));
  },
  updateNode: (node: NodeElement, newContent: string) => {
    const n = get();
    const m = [...n.nodes];
    const i = n.nodes.findIndex((k) => k.id === node.id);
    if (i !== -1) {
      m[i].content = newContent;
    }
    set(() => ({ nodes: m }));
  },
}));

export default useDataStore;
