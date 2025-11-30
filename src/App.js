import ImageGenerator from "./components/Generator";
import ImageGeneratorPage from "./components/Home";

function App() {
  return (
    <div
      style={{
        background: "radial-gradient(ellipse at top, #1b2735 70%, #080e21 95%)",
      }}
    >
      {/* <ImageGenerator /> */}
      <ImageGeneratorPage />
    </div>
  );
}

export default App;
