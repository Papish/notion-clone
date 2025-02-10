import React from "react";
import { Node } from "../types/node";

type Props = {
  node: Node;
  onAdd: (node: Node) => void;
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

const ContentNode = ({ node, onAdd }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAdd(node);
    }
  };

  return (
    <DynamicElement element={node.element}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="content-node-warpper"
        dangerouslySetInnerHTML={{ __html: node.content }}
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
              <ContentNode node={node} onAdd={onAdd} />
            </div>
          ))
        : null}
    </DynamicElement>
  );
};

export default ContentNode;
