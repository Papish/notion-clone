import React, { useEffect, useRef } from "react";
import useDataStore from "../store/dataStore";
import { debounce } from "lodash";

interface Props {
  node: string;
}

const ContentNode = ({ node }: Props) => {
  const data = useDataStore((state) => state.nodes.find((n) => n.id === node));
  const { addNewNode, updateNode } = useDataStore();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  if (!data) return null;

  const handleInput = debounce((e: React.FormEvent) => {
    const target = e.target as HTMLElement;
    // updateNode(data, target.innerHTML);
  }, 500);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      addNewNode();
    }
  };

  return (
    <div>
      <div
        ref={ref}
        tabIndex={0}
        contentEditable
        suppressContentEditableWarning
        className="content-node-warpper content"
        dangerouslySetInnerHTML={{ __html: data.content }}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      ></div>{" "}
      {/* {data.children && data.children.length > 0
        ? data.children.map((n) => (
            <div
              key={n}
              style={{
                marginLeft: "20px",
              }}
            >
              <ContentNode node={n} />
            </div>
          ))
        : null} */}
    </div>
  );
};

export default ContentNode;
