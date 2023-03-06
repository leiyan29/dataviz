import * as d3 from "d3";
import * as topojson from "topojson-client";

const draw = (educationData, countyData, props) => {
  d3.select(".map > *").remove(); // 没懂
  const w = 960,
    h = 600;

  const svg = d3
    .select(".map")
    .append("svg")
    .attr("height", h + 150)
    .attr("width", w)
    .attr("id", "svg-map");

  let color = d3
    .scaleThreshold()
    .domain([10, 20, 30, 40, 50, 60])
    .range(["#f2f0f7", "#dadaeb", "#bcbddc", "#9e9ac8", "#756bb1", "#54278f"]);

  let tooltip = d3
    .select(".map")
    .append("div")
    .attr("class", "tooltip")
    .attr("id", "tooltip")
    .style("opacity", 0);

  const assignFillColor = function() {
    let eduLevel = d3.select(this).attr("data-education"); //data-education 是什么; select(this)
    return color(eduLevel);
  };

  let path = d3.geoPath();

  let counties = svg.append("g");
  counties
    .selectAll("path")
    .data(topojson.feature(countyData, countyData.objects.counties).features) // 理解topojson
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", "county")
    .attr("data-fips", d => d.id) // 理解data-fips
    .attr(
      "data-state",
      d => educationData.filter(item => item.fips === d.id)[0].state
    )
    .attr(
      "data-education",
      d => educationData.filter(item => item.fips === d.id)[0].bachelorsOrHigher
    )
    .attr(
      "data-county",
      d => educationData.filter(item => item.fips === d.id)[0].area_name
    )
    .attr("fill", assignFillColor)
    .style("stroke", "white")
    .style("stroke-width", ".25")
    .on("mouseover", function(d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0.9);
      tooltip
        .html(
          "<strong>State: </strong>" +
            d3.select(this).attr("data-state") +
            "</br><strong>County: </strong>" +
            d3.select(this).attr("data-county") +
            "</br><strong>Bachelor's or Higher: </strong>" +
            d3.select(this).attr("data-education") +
            "%"
        )
        .attr("data-education", d3.select(this).attr("data-education")) //data-education
        .style("left", d3.event.pageX + 20 + "px") //d3.event
        .style("top", d3.event.pageY + 20 + "px");
    })
    .on("mouseout", function(d) {
      tooltip
        .transition()
        .duration(400)
        .style("opacity", 0);
    });

  /* Creates the visualization for state borders */
  let states = svg.append("g");
  states
    .selectAll("path")
    .data(topojson.feature(countyData, countyData.objects.states).features)
    .enter()
    .append("path")
    .attr("d", path)
    .style("stroke", "white")
    .style("stroke-width", "2")
    .style("fill", "none")
    .style("opacity", 0.5);

  let legendValues = [
    ["< 10%", "#f2f0f7"],
    ["10% to 20%", "#dadaeb"],
    ["20% to 30%", "#bcbddc"],
    ["30% to 40%", "#9e9ac8"],
    ["40% to 50%", "#756bb1"],
    ["> 50%", "#54278f"]
  ];

  let legend = svg
    .append("g")
    .attr("class", "legend")
    .attr("id", "legend");

  legend
    .selectAll("rect")
    .data(legendValues)
    .enter()
    .append("rect")
    .attr("width", 12)
    .attr("height", 12)
    .attr("x", 45)
    .attr("y", (d, i) => h + 100 - i * 20)
    .attr("fill", d => d[1]) //fill
    .attr("id", "legend");

  legend
    .selectAll("text")
    .data(legendValues)
    .enter()
    .append("text")
    .attr("x", 70)
    .attr("y", (d, i) => h + 100 - i * 20)
    .attr("dy", ".7em") //dy
    .text(d => d[0]);
};

export default draw;
