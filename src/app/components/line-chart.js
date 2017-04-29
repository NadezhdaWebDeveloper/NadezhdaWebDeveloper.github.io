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

const series = [{
  name: 'Понедельник',
  data: [100, 203, 232]
}, {
  name: 'Вторник',
  data: [205, 240, 234]
}, {
  name: 'Среда',
  data: [250]
}, {
  name: 'Четверг',
  data: [180]
}, {
  name: 'Пятница',
  data: [290]
}, {
  name: 'Суббота',
  data: [175]
}, {
  name: 'Воскресенье',
  data: [205]
}];

class LineChart extends React.Component {
  constructor() {
    super();
    this.state = {series};
  }
  render() {
    return <Chart width={730} height={300} series={this.state.series} minY={0} maxY={300} minX={0}>
      <Layer width='100%' height='90%' position='middle center'>
        <Ticks
          axis='y'
          ticks={{maxTicks: 5}}
          tickVisible={({tick}) => tick.y + 1}
          lineLength='100%'
          lineVisible={true}
          lineStyle={{stroke:'lightgray'}}
          labelStyle={{textAnchor:'end',alignmentBaseline:'middle',fontSize:'0.85em',fontFamily:'sans-serif',fill:'lightgray'}}
          labelAttributes={{x: -5}}
        />
        <Ticks
          axis='x'
          tickVisible={({tick}) => tick.x < 10}
          lineLength='-100%'
          lineVisible={true}
          lineStyle={{stroke:'lightgray'}}
          label={({props, index}) => props.series[index].name}
          labelStyle={{textAnchor:'middle',alignmentBaseline:'before-edge',fontSize:'0.85em',fontFamily:'sans-serif',fill:'lightgray'}}
          labelAttributes={{y: 3}}
        />
        <Lines
          interpolation="linear"/>
        <Dots />
        <Labels
          label={({point}) => Math.round(point.y)}
          dotStyle={{
            alignmentBaseline:'after-edge',
            textAnchor:'middle',
            fontFamily:'sans-serif',
            opacity: 0
          }}
          labelAttributes={
            {y: -4},
            {
              onMouseLeave: e => e.target.style.opacity = 0,
              onMouseMove: e => e.target.style.opacity = 1,
            }
          }
        />
      </Layer>
    </Chart>;
  }
}

module.exports = LineChart;
