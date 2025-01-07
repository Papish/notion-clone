import { useEffect, useRef, useState } from "react";
import ContentNode from "./components/ContentNode";
import { getPageContent } from "./apis/page";
import { NodeElement } from "./types/node";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { cloneDeep } from "lodash";

function App() {
  const [nodes, setNodes] = useState<NodeElement[]>([]);
  const [formattedNodes, setFormattedNodes] = useState<NodeElement[]>([]);
  const pageNode = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodes && nodes.length > 0) {
      const elementNodes: NodeElement[] = [];
      cloneDeep(nodes).forEach((node) => {
        if (node.parentId) {
          const i = elementNodes.findIndex((n) => n.id === node.parentId);
          if (i !== -1) {
            elementNodes[i].children.push(node);
          }
        } else {
          elementNodes.push(node);
        }
      });
      setFormattedNodes(elementNodes);
    }
  }, [nodes]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await getPageContent();
      setNodes(responseData);
    };

    fetchData();

    const targetNode = pageNode.current;
    if (!targetNode) return;

    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "attributes") {
          //
        }
      }
    });

    observer.observe(targetNode, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const addNextNode = (parentId: string | null) => {
    setNodes((n) => [
      ...n,
      {
        id: uuidv4(),
        element: "div",
        content: "some new content",
        parentId: parentId,
        children: [],
      },
    ]);
  };

  return (
    <>
      <div ref={pageNode}>
        {formattedNodes.map((node) => (
          <ContentNode node={node} key={node.id} addNextNode={addNextNode} />
        ))}
      </div>
    </>
  );
}

export default App;
