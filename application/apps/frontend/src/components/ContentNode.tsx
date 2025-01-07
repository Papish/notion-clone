import React, { useEffect, useRef, useState } from "react";
import { NodeElement } from "../types/node";

const DynamicElement = ({
  element = "div",
  children,
  id = "",
}: {
  element: string;
  children: React.ReactNode[];
  id: string;
}) => {
  return React.createElement(
    element,
    {
      className: "content-node",
      "data-block-id": id,
    },
    children
  );
};

interface Props {
  node: NodeElement;
  addNextNode: (parent: NodeElement["parentId"]) => void;
}

const ContentNode = ({ node, addNextNode }: Props) => {
  const [htmlContent, setHtmlContent] = useState(node.content);

  const handleInput = (e: React.FormEvent) => {
    const target = e.target as HTMLElement;
    setHtmlContent(target.innerHTML);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNextNode(node.parentId);
    }
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <DynamicElement element={node.element} id={node.id}>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className="content-node-warpper"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onBlur={handleInput}
        onKeyDown={handleKeyDown}
      ></div>
      {node.children && node.children.length > 0
        ? node.children.map((node) => (
            <div
              key={node.id}
              style={{
                marginLeft: "20px",
              }}
            >
              <ContentNode node={node} addNextNode={addNextNode} />
            </div>
          ))
        : null}
    </DynamicElement>
  );
};

export default ContentNode;
