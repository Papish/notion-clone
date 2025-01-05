import { useState } from "react";
import "./App.css";
import ContentNode from "./components/ContentNode";
import { Node } from "./types/node";

function App() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      element: "div",
      content: "<b>content</b>",
      children: [
        {
          element: "h1",
          content: "content",
          children: [],
        },
      ],
    },
  ]);

  return (
    <>
      {nodes.map((node, i) => (
        <ContentNode node={node} key={i} />
      ))}
    </>
  );
}

export default App;
