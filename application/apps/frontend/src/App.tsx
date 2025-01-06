import { useEffect, useRef, useState } from "react";
import "./App.css";
import ContentNode from "./components/ContentNode";
import { NodeElement } from "./types/node";
import { getPageContent } from "./apis/page";

function App() {
  const [nodes, setNodes] = useState<NodeElement[]>([]);
  const pageNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetNode = pageNode.current;

    if (!targetNode) return;

    const fetchData = async () => {
      const data = await getPageContent();
      setNodes(data);
    };

    fetchData();

    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "characterData") {
          // Traverse up the DOM to find the ancestor with the data-block-id
        }
      }
    });

    // Observe the subtree and characterData changes
    observer.observe(targetNode, {
      childList: true,
      subtree: true,
      attributes: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={pageNode}>
        {nodes.map((node) => (
          <ContentNode node={node} key={node.id} />
        ))}
      </div>
    </>
  );
}

export default App;
