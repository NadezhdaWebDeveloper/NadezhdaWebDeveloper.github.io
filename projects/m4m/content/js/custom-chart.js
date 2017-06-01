$(document).ready(function(){
	var duration_time = 500;
	var drawGraph = function() {

	  $('#chart').empty();
	  
	  var margin = {
	    top: 0,
	    right: 80,
	    bottom: 60,
	    left: 80
	  };
	  
	  var strokeWidth = 3;
	  var pointRadius = 4;
	  // var width = $('#chart').width() - margin.left - margin.right;
	  var width = 440;
	  var height = $('#chart').height() - margin.top - margin.bottom;
	  var stroke = '#2990ea'; // blue
	  var areaFill = 'rgba(41,144,234,0.1)'; // lighter blue
	  
	  var JSONData = [];
	  for(var i=0; i<10; i++) {
	    JSONData.push({
	      "name": moment().add(i, 'days').format('MMM D YYYY'),
	      "value": Math.round(Math.random()*60) + 1
	    });
	  }

	  var data = JSONData.slice();
	  var format = d3.time.format("%b %e %Y");
	  var valueFn = function(d) { return d.value };
	  var dateFn = function(d) { return format.parse(d.name) };

	  var max = d3.max(data, function(d) { return d.value + (d.value*0.33) });
	  var tickVals = [];
	  for(var i=0; i<max; i+=10) {
	    tickVals.push(i);
	  }

	  //
	  // Setup y scale
	  //
	  var y = d3.scale.linear()
	    .domain([0, max])
	    .range([height, 0]);
	  
	  //
	  // Setup x scale
	  //
	  var x = d3.time.scale()
	    .domain(d3.extent(data, dateFn))
	    .range([0, width]);
	  
	  //
	  //
	  //
	  var tooltip = d3.select('body')
	    .append("div")
	    .attr("class", "chart-tooltip")
	    .style("display", 'none');
	  
	  //
	  // function for filling area under chart
	  //
	  var area = d3.svg.area()
	    .x(function(d, i) { return x(format.parse(d.name)); })
	    .y0(height)
	    .y1(function(d) { return y(d.value); });
	    
	  //
	  // function for drawing line
	  //
	  var line = d3.svg.line()
	    .x(function(d, i) { return x(format.parse(d.name)); })
	    .y(function(d) { return y(d.value); });
	  
	  var lineStart = d3.svg.line()
	    .x(function(d, i) { return x(format.parse(d.name)); })
	    .y(function(d) { return y(0); });
	  
	  //
	  // select the element and append svg to it
	  //
	  var graph = d3.select('#chart').append('svg')
	    .attr('width', width + margin.left + margin.right)
	    .attr('height', height + margin.top + margin.bottom)
	    .style('overflow', 'visible');
	    
	  //
	  // draw horizontal grid lines
	  //
	  _.each(tickVals, function(val, i) {
	    var tickScale = height/tickVals.length;
	    graph.append('line')
	      .attr('x1', margin.left)
	      .attr('x2', margin.left + width)
	      .attr('y1', height + margin.top - (i*tickScale))
	      .attr('y2', height + margin.top - (i*tickScale))
	      .attr('stroke', '#efefef')
	      .attr('stroke-width', 2)
	      .attr('fill', 'none');
	  });
	  
	  //
	  // make the line
	  //
	  graph.append('path')
	    .attr('stroke', stroke)
	    .attr('stroke-width', strokeWidth)
	    .attr('fill', 'none')
	    .attr('transform', 'translate(' + (margin.left) + ',' + margin.top + ')')
	    .attr('d', lineStart(data))
	    .transition().duration(duration_time)
	    .attr('d', line(data));
	  
	  //
	  // fill area under the graph
	  //
	  graph.append("path")
	    .datum(data)
	    .attr("class", "area")
	    .attr('fill', areaFill)
	    .attr('transform', 'translate(' + (margin.left) + ',' + margin.top + ')')
	    .attr('d', lineStart(data))
	    .transition().duration(duration_time)
	    .attr("d", area);
	  
	  //
	  // add points to the line
	  //
	  var point = graph.append('g');
	  point.selectAll('circle')
	    .data(data).enter()
	    .append('circle')
	    .attr('fill', stroke)
	    .attr('transform', 'translate(' + (margin.left) + ',' + margin.top + ')').attr('r', pointRadius)
	    .on("mouseover", function(d) {
	      //
	      // Change dots on hover
	      //
	      d3.select(this)
	        .attr("r", pointRadius*1.5)
	        .style("fill", "#ffffff")
	        .attr('stroke', '#2d2d2d')
	        .attr('stroke-width', pointRadius);
	    
	      //
	      // draw vertical lines on hover
	      //
	      graph.append('line')
	        .attr('class', 'vertical-marker-bottom')
	        .attr('x1', margin.left + x(format.parse(d.name)))
	        .attr('x2', margin.left + x(format.parse(d.name)))
	        .attr('y1', height + margin.top)
	        .attr('y2', y(d.value) + (pointRadius*2))
	        .attr('stroke', '#DCE6EF') // color isn't same as horizontal bars due to color multiplication
	        .attr('stroke-width', 2)
	        .attr('fill', 'none');
	    
	      graph.append('line')
	        .attr('class', 'vertical-marker-top')
	        .attr('x1', margin.left + x(format.parse(d.name)))
	        .attr('x2', margin.left + x(format.parse(d.name)))
	        .attr('y1', y(d.value) - (pointRadius*2))
	        .attr('y2', y(d.value) - 40)
	        .attr('stroke', '#363B3E')
	        .attr('stroke-width', 2)
	        .attr('fill', 'none');
	    
	      //
	      // draw the tooltip
	      //
	      tooltip.html(d.value + '<span class="date"> - ' + moment(d.name).format('MMM D') + '<span>')
	        .style('display', 'inline');
	    
	      var w = $('.chart-tooltip').width();
	      tooltip
	        .style('top', (d3.event.pageY - 80) + 'px')
	        .style('left', (d3.event.pageX - w) + 'px');
	    })                  
	    .on("mouseout", function(d) {
	      //
	      // Change dots back
	      //
	      d3.select(this)
	        .attr("r", pointRadius)
	        .style("fill", stroke)
	        .attr('stroke', 'none')
	        .attr('stroke-width', 0);
	    
	      //
	      // Remove vertical line
	      //
	      graph.selectAll('.vertical-marker-bottom').remove();
	      graph.selectAll('.vertical-marker-top').remove();
	    
	      //
	      // Remove tooltip
	      //
	      tooltip.style('display', 'none');  
	    })
	    .attr('cx', function(d, i) { return x(format.parse(d.name)); })
	    .attr('cy', function(d, i) { return y(0); })
	    .transition().duration(duration_time)
	    .attr('cy', function(d, i) { return y(d.value); });
	  
	  //
	  // draw y axis labels
	  //
	  _.each(tickVals, function(val, i) {
	    var tickScale = height/tickVals.length;
	    graph.append('text')
	      .attr('x', margin.left - 25)
	      .attr('y', height + margin.top - (i*tickScale) + 3)
	      .text(tickVals[i])
	      .attr('fill', '#b7bbbd')
	      .style('font-size', '14px')
	      .attr('text-anchor', 'middle');
	  });
	  
	  //
	  // draw x axis labels
	  //
	  _.each(data, function(d, i) {
	    var tickScale = width/data.length;
	    if(i%2 == 1) {
	      graph.append('text')
	        .attr('x', margin.left + x(format.parse(d.name)))
	        .attr('y', height + 30)
	        .text(moment(d.name).format('MMM D'))
	        .attr('text-anchor', 'middle')
	        .style('font-size', '14px')
	        .attr('fill', '#b7bbbd');
	    }
	  });
	  
	  //
	  // remove the unwanted domain lines from the x axis
	  //
	  graph.selectAll('.domain').remove();
	  
	};


	drawGraph();
});