import React from "react";
import "./App.css";
import axios from "axios";

import "./components/HelloFromRail";
import HelloFromRail from "./components/HelloFromRail";
import List from "./views/List";

const App: React.FC = () => {
  return (
    <div className="App">
      <HelloFromRail />
      {/* <List /> */}
    </div>
  );
};

export default App;
