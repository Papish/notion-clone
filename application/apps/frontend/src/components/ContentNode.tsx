import React, { useState } from "react";
import { Node } from "../types/node";

type Props = {
  node: Node;
  onUpdate: (node: Node) => void;
};

const DynamicElement = ({
  element = "div",
  children,
}: {
  element: string;
  children: React.ReactNode[];
}) => {
  return React.createElement(element, { className: "content-node" }, children);
};

const ContentNode = ({ node, onUpdate }: Props) => {
  const [htmlContent, setHtmlContent] = useState(node.content);

  const handleInput = (e: React.FormEvent) => {
    const target = e.target as HTMLElement;
    setHtmlContent(target.innerHTML);
    onUpdate({
      ...node,
      content: target.innerHTML,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  return (
    <DynamicElement element={node.element}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="content-node-warpper"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onBlur={handleInput}
        onKeyDown={handleKeyDown}
      ></div>
      {node.children && node.children.length > 0
        ? node.children.map((node, i) => (
            <div
              key={i}
              style={{
                marginLeft: "20px",
              }}
            >
              <ContentNode node={node} onUpdate={onUpdate} />
            </div>
          ))
        : null}
    </DynamicElement>
  );
};

export default ContentNode;
