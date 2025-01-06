import { useEffect, useState } from "react";
import "./App.css";
import ContentNode from "./components/ContentNode";
import { Node } from "./types/node";
import { getPageContent, updatePageContent } from "./apis/page";

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPageContent();
      setNodes(data);
    }

    fetchData();
  }, [])

  const updateNode = async (node: Node) => {
    await updatePageContent(node)
    const i = nodes.findIndex((n) => n.id === node.id);
    if (i !== -1) {
      const n = [...nodes];
      n[i].content = node.content;
      setNodes(n)
    }
  }

  return (
    <>
      {nodes.map((node, i) => (
        <ContentNode node={node} key={i} onUpdate={updateNode} />
      ))}
    </>
  );
}

export default App;
