import ImageGenerator from "./components/Generator";

function App() {
  return (
    <div
      style={{
        background: "radial-gradient(ellipse at top, #080e21 0%, #1b2735 95%)",
      }}
      className="h-screen p-3"
    >
      <ImageGenerator />
    </div>
  );
}

export default App;
