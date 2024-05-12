import React from "react";
import "./App.css";
import "./components/HelloFromRail";
import { Link, Route, Routes } from "react-router-dom";
import Index from "./views/Index";

const App: React.FC = () => {
  return (
    <div className="container h-screen  ">
      <nav className=" mx-2 px-1 py-4 flex place-content-between md:mx-24">
        <ul>
          <Link to="/">Home</Link>
        </ul>
        <ul></ul>
      </nav>
      <Routes>
        <Route path="/" element={<Index />} />
        {/* <Route path="/item" element={<Item />} />
        <Route path="/item/:id" element={<Item />} /> */}
      </Routes>
    </div>
  );
};

export default App;
