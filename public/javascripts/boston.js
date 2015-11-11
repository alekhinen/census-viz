window.onload = function() {
  loadBarChart();
  loadGenderDonutChart();
  loadHousingDonutChart();
  loadRaceDonutChart();
}

function loadBarChart() {
  var margin, width, height, x, y, xAxis, yAxis, svg;

  margin = {top: 20, right: 20, bottom: 30, left: 40};
  width = 500 - margin.left - margin.right;
  height = 300 - margin.top - margin.bottom;

  x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
  y = d3.scale.linear()
    .range([height, 0]);

  xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
  yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

  svg = d3.select("#age-chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.json("/datasets/boston.json", function(error, data) {
    if (error) {
      throw error;
    }

    var age_groups = data.boston.age_groups;
    var max_value = d3.max(age_groups, function(d) { return d.value; });
    x.domain(age_groups.map(function(d) { return d.name; }));
    y.domain([0, max_value]);

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Person Count");

    svg.selectAll(".bar")
        .data(age_groups)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.name); })
        .attr("width", x.rangeBand() + 1)
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { return height - y(d.value); });
  });
}

function loadGenderDonutChart() {
  var width = 250,
    height = 250,
    radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#15A5E8", "#E81570"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 55);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

  var svg = d3.select("#gender-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json("/datasets/boston.json", function(error, data) {
    if (error) {
      throw error;
    }

    var data = data.boston.gender_groups;

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.name); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.name; });

  });
}

function loadHousingDonutChart() {
  var width = 250,
    height = 250,
    radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#CC2A39", "#FF7A7A"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 55);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.pop_value; });

  var svg = d3.select("#housing-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json("/datasets/boston.json", function(error, data) {
    if (error) {
      throw error;
    }

    var data = data.boston.housing_groups;

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.name); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.name; });

  });
}

function loadRaceDonutChart() {
  var width = 250,
    height = 250,
    radius = Math.min(width, height) / 2;

  var color = d3.scale.ordinal()
      .range(["#F9F9F9", "#666", "#888", "#999", "#aaa", "#bbb", "#ccc"]);

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 55);

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.value; });

  var svg = d3.select("#race-chart").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.json("/datasets/boston.json", function(error, data) {
    if (error) {
      throw error;
    }

    var data = data.boston.race_groups;

    var g = svg.selectAll(".arc")
        .data(pie(data))
      .enter().append("g")
        .attr("class", "arc");

    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) { return color(d.data.name); });

    g.append("text")
        .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
        .attr("dy", ".35em")
        .style("text-anchor", "middle")
        .text(function(d) { return d.data.name; });

  });
}
