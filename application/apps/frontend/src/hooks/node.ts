import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface INode {
  id: string;
  content: string;
  children: INode[];
}

export default function useNode() {
  const [data, setData] = useState<INode[]>([]);

  const addNode = () => {
    const newNode: INode = {
      children: [],
      content: "",
      id: uuidv4(),
    };
    setData((prev) => [...prev, newNode]);
  };

  return {
    data,
    addNode,
  };
}
