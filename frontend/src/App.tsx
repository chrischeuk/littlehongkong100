import React from "react";
import "./App.css";

import "./components/HelloFromRail";

import List from "./views/List";
import { Link, Route, Routes } from "react-router-dom";
import Item from "./views/Item";

const App: React.FC = () => {
  return (
    <div className="container  ">
      <nav className=" mx-auto px-3 py-2">
        <ul>
          <Link to="/">Home</Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </div>
  );
};

export default App;
