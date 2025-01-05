import React, { useState } from "react";
import { Node } from "../types/node";

type Props = {
  node: Node;
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

const ContentNode = (props: Props) => {
  const [htmlContent, setHtmlContent] = useState(props.node.content);

  const handleInput = (e: React.FormEvent) => {
    const target = e.target as HTMLElement;
    setHtmlContent(target.innerHTML);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
  };

  return (
    <DynamicElement element={props.node.element}>
      <div
        contentEditable
        suppressContentEditableWarning
        className="content-node-warpper"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        onBlur={handleInput}
        onKeyDown={handleKeyDown}
      ></div>
      {props.node.children && props.node.children.length > 0
        ? props.node.children.map((node, i) => (
            <div
              key={i}
              style={{
                marginLeft: "20px",
              }}
            >
              <ContentNode node={node} />
            </div>
          ))
        : null}
    </DynamicElement>
  );
};

export default ContentNode;
