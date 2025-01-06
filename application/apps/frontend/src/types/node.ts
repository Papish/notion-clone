export type NodeElement = {
  id: string;
  element: string;
  content: string;
  parentId: string | null;
  children?: NodeElement[]
};
