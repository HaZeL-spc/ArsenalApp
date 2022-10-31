import "./css/App.css";
import LatestScores from "./pages/LatestScores";
import MainHolder from "./pages/MainHolder";
const { default: HeaderPage } = require("./pages/HeaderPage");
const { default: Nav } = require("./components/Nav");

function App() {
  return (
    <div className="app-container font-sans">
      <Nav />
      <div className="d-flex flex-column w-100">
        <HeaderPage />
        <MainHolder />
        <LatestScores />
      </div>
    </div>
  );
}

export default App;
