import React, { Component } from "react";
import draw from "./dThreeFunction";
import axios from "axios";
import "./Map.css";

class Map extends Component {
  async componentDidMount() {
    const rawEducationData = await axios.get(
      "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json"
    );
    const educationData = rawEducationData.data;

    const rawCountyData = await axios.get(
      "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json"
    );

    const countyData = rawCountyData.data;

    draw(educationData, countyData, this.props);
  }
  render() {
    return <div className="map" />;
  }
}

export default Map;
