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



class StakedBarChart extends React.Component {
  constructor(props){
    super(props);

  }
  render() {

    var current_indicators = this.props.current_indicators;
    var compared = this.props.compared;
    var diff = compared - current_indicators;
    var _diff;
    console.log(this.props.special_color);
    if (this.props.special_color) {
      _diff = {y: diff, color: '#eeb607'}
    }else{
      _diff = diff;
    }

    var series = [{ data: [current_indicators, _diff] }];
    return(
      <Chart width={300} height={5} series={series} minY={0}>
        <Layer width='100%' height='100%' position='right middle'>
          <Transform method={['transpose', 'stack', 'rotate']}>
            <Bars
              combined={true}
              colors={['#567ba7', '#eee']}
             />
          </Transform>
        </Layer>
      </Chart>
    );
  }
}

module.exports = StakedBarChart;
