import "../node_modules/tailwindcss/base.css";
import "../node_modules/tailwindcss/components.css";
import "../node_modules/tailwindcss/utilities.css";
import Search from "./Components/Search";
import Projects from "./Components/Projects";
import Project from "./Components/Project";
import { Routes, Route } from "react-router-dom";
import FavoritedProjects from "./Components/FavoritedProjects";

function App() {
  return (
    <div className="flex justify-center mt-10">
      <div>
        <Search />
        <Routes>
          <Route path="/" element={<Projects />} />
          <Route path="/Projects" element={<Projects />} />
          <Route path="/Favorite" element={<FavoritedProjects />} />
          <Route path="/Projects/:ProjectID" element={<Project />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
