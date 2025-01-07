import ContentNode from "./components/ContentNode";
import useDataStore from "./store/dataStore";
import "./App.css";

function App() {
  const { getMainNodes, nodes } = useDataStore();
  return (
    <>
      <div>
        <pre>{JSON.stringify(nodes, null, 2)}</pre>
        {getMainNodes().map((node) => (
          <ContentNode node={node} key={node} />
        ))}
      </div>
    </>
  );
}

export default App;
