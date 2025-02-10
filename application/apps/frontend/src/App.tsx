import { useEffect, useRef, useState } from "react";
import "./App.css";
import ContentNode from "./components/ContentNode";
import { Node } from "./types/node";
import { getPageContent } from "./apis/page";
import { uuid } from "./utis";

function App() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPageContent();
      setNodes(data);
    };

    fetchData();
  }, []);

  const addNode = (node: Node) => {
    const newNode = {
      content: "new 111",
      element: "div",
      id: uuid(),
      parentId: node.id,
      children: [],
    };

    const i = nodes.findIndex((a) => a.id === node.id);
    if (i !== -1) {
      setNodes((prev) => [...prev, newNode]);
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "characterData") {
          //
        }
      }
    });

    observer.observe(ref.current, {
      characterData: true,
      subtree: true,
      childList: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={ref}>
      <pre>{JSON.stringify(nodes, null, 2)}</pre>
      {nodes.map((node, i) => (
        <ContentNode node={node} key={i} onAdd={addNode} />
      ))}
    </div>
  );
}

export default App;
