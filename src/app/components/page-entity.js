import React from 'react';
import { Link } from 'react-router';

// Import custom components
import Page from './page';
import Service from './service';

import jsondb from '../data/jsondb';

//CSS imports
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

// Import charts
import LineChart from './line-chart';


function Services(props){
  return (
    <div className="row services">
      {
        props.data.map((service, index) =>
          (
            <div className="col-md-4" key={index}>
              <Service data={service} />
            </div>
          )
        )
      }
    </div>
  );
}


class Entity extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      scaleItems: 7
    }
  }

  render(){

    var data,
        entityIndex,
        search = window.location.search.substr(1),
        getParams = {};

    if (search === '') { location = '/'; }

    search.split('&').forEach(function(item) {
      item = item.split('=');
      getParams[item[0]] = item[1];
    });

    jsondb[0].havings.map(function(entity, index){
      if (entity.translit === getParams.entity) {
        entityIndex = index;
        return false;
      }
    });

    data = jsondb[0].havings[entityIndex];
    var chartParameters;

    return(
      <Page page_class={(this.props.route.path).slice(1)}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2><i className="fa fa-bar-chart" aria-hidden="true"></i>{data.entity}</h2>
              <div className="row">
                <div className="col-md-12">
                  <div className="cardStyle lineChartWrap">
                    <div className="row selectRow">
                      <div className="col-md-6">
                        <select name="scaleItems" value={this.state.scaleItems} onChange={this.selectChanged}>
                          <option value="31">За месяц</option>
                          <option value="7">За неделю</option>
                          <option value="24">За день</option>
                        </select>
                      </div>
                      <div className="col-md-6 text-right">
                        <select>
                          {
                            data.services.map((entity, index) =>
                              (
                                <option value={entity.name} key={index}>{entity.name}</option>
                              )
                            )
                          }
                        </select>
                      </div>
                    </div>
                    <div>
                      <LineChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Services data={data.services} />

        </div>
      </Page>
    );
  }
}

module.exports = Entity;
