import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Navbar";
import VideoList from "./VideoList";
import VideoPlayer from "./VideoPlayer";
import SearchTermContext from "./SearchTermContext";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  const changeSearchTerm = (value) => {
    setSearchTerm(value);
  };

  return (
    <div>
      <SearchTermContext.Provider value={changeSearchTerm}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<VideoList searchTerm={searchTerm} />} />
            <Route path="/video/:id" element={<VideoPlayer />} />
          </Routes>
        </BrowserRouter>
      </SearchTermContext.Provider>
    </div>
  );
}

export default App;
