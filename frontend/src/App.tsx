import React from "react";
import "./App.css";

import "./components/HelloFromRail";

import List from "./views/List";
import { Link, Route, Routes } from "react-router-dom";
import Item from "./views/Item";

const App: React.FC = () => {
  return (
    <div className="container  ">
      <nav className=" mx-2 px-1 py-4 flex place-content-between md:mx-24">
        <ul>
          <Link to="/">Home</Link>
        </ul>
        <ul></ul>
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
