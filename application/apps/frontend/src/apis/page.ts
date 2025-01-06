import { v4 as uuidv4 } from "uuid";
import { NodeElement } from "../types/node";

const parentId = uuidv4();

const data: NodeElement[] = [
  {
    id: parentId,
    element: "div",
    content: "some content",
    parentId: null,
  },
  {
    id: uuidv4(),
    element: "h1",
    content: "nested content",
    parentId: parentId,
  },
];

export const getPageContent = (): Promise<NodeElement[]> => {
  return new Promise((resolve) => {
    const nodes: NodeElement[] = [];

    data.forEach((node) => {
      if (node.parentId) {
        const i = nodes.findIndex((n) => n.id === node.parentId);
        if (i !== -1) {
          nodes[i].children = [];
          nodes[i].children.push(node);
        }
      } else {
        nodes.push(node);
      }
    });

    resolve(nodes);
  });
};

export const updatePageContent = (node: NodeElement) => {
  return new Promise((resolve) => {
    const i = data.findIndex((n) => n.id === node.id);
    if (i !== -1) {
      data[i].content = node.content
    }
    resolve({})
  })
}
