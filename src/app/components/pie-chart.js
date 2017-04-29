import React from 'react';

const {
  // main component
  Chart,
  // graphs
  Bars, Cloud, Dots, Labels, Lines, Pies, RadialLines, Ticks, Title,
  // wrappers
  Layer, Animate, Transform, Handlers,
  // helpers
  helpers, DropShadow, Gradient
} = require('rumble-charts');

const series = [{data: [50, 50, 50, 50]}];

class PieChart extends React.Component {
  render() {
    return(
    <Chart width={200} height={200} series={series} minY={0}>
      <Transform method={['transpose', 'stackNormalized']}>
        <Pies
          colors={['#ed383f', '#efb607', '#567ba7', '#6ab980']}
          combined={true}
          innerRadius='80%'
          padAngle={0.025}
          innerPadding='1.5%'
          pieAttributes={{
            onMouseLeave: e => e.target.style.opacity = 1,
            onMouseMove: e => e.target.style.opacity = 0.8,
          }}
          pieStyle={{
            opacity: 1
          }}
        />
      </Transform>
    </Chart>);
  }
}

module.exports = PieChart;
