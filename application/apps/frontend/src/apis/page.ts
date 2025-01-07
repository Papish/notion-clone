import { v4 as uuidv4 } from "uuid";
import { NodeElement } from "../types/node";

const parentId = uuidv4();

const data: NodeElement[] = [
  {
    id: parentId,
    element: "div",
    content: "some content",
    parentId: null,
    content: [],
  },
  {
    id: uuidv4(),
    element: "h1",
    content: "nested content",
    parentId: parentId,
    content: [],
  },
];

export const getPageContent = (): Promise<NodeElement[]> => {
  return new Promise((resolve) => {
    resolve(data);
  });
};

export const updatePageContent = (node: NodeElement) => {
  return new Promise((resolve) => {
    const i = data.findIndex((n) => n.id === node.id);
    if (i !== -1) {
      data[i].content = node.content;
    }
    resolve({});
  });
};
