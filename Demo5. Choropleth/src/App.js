import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>U.S. Educational attainment</h1>
        <h3>
          Percentage of adults ages 25 and older with a bachelor's degree or
          higher (2010-2014)
        </h3>
        <div>
          <Map />
        </div>
      </div>
    );
  }
}

export default App;
