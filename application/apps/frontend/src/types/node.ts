export type Node = {
  id: string;
  element: string;
  content: string;
  parentId: string | null;
  children?: Node[]
};
