import React from "react";
import "./App.css";
import axios from "axios";

import "./components/HelloFromRail";
import HelloFromRail from "./components/HelloFromRail";
import List from "./views/List";
import { Link, Route, Routes } from "react-router-dom";
import Item from "./views/Item";

const App: React.FC = () => {
  return (
    <>
      <nav>
        <ul>
          <Link to="/">Home</Link>
        </ul>
        <ul>
          <Link to="/item">Item</Link>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/item" element={<Item />} />
        <Route path="/item/:id" element={<Item />} />
      </Routes>
    </>
  );
};

export default App;
