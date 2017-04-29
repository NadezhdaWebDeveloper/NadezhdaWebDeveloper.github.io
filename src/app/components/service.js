import React from 'react';
import { Link } from 'react-router';

import Popup from './popup';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

// Import charts
import LineChart from './line-chart';
import StakedBarChart from './stakedbar-chart';

class Service extends React.Component{
  constructor(props){
    super(props);

  }

  render(){

    var service = this.props.data;
    var unit = service.unit;
    console.log(service);

    var accural = (service.indicators_difference * service.tariff).toFixed(2);
    var overpayment = (service.overpayment).toFixed(2);
    var underpayment = (service.underpayment).toFixed(2);
    var total_payment = (accural - overpayment - underpayment).toFixed(2);
    var current_indicators = service.indicators_difference;
    var prediction = 400;
    var last_indicators = 400;

    return(
      <div className="cardStyle cardStyle--withBtns">
        <div className="service">
          <div className="service__title">
            <h4 className="service__title__name blackText">{service.name}</h4>
            <small className="service__title__company">{service.company}</small>
            <div className="service__title__indicator"></div>
          </div>
          <div className="service__accrual cardRow">
            <span className="cardRow__item">Начисление:</span>
            <span className="cardRow__item text-right blackText">{accural} руб</span>
          </div>

          <div className="service__overpayment cardRow">
            <span className="cardRow__item">Переплата:</span>
            <span className="cardRow__item text-right blackText">{overpayment} руб</span>
          </div>

          <div className="service__total cardRow">
            <span className="cardRow__item">И того к оплате:</span>
            <span className="cardRow__item text-right blackText">{total_payment} руб</span>
          </div>

          <div className="stakedBarChartWrap">
            <div className="cardRow">
              <span className="cardRow__item">За месяц:</span>
              <span className="cardRow__item text-right"><span className="blackText">{current_indicators} {unit}</span> <small>({prediction} прогноз)</small></span>
            </div>
            <StakedBarChart current_indicators={current_indicators} compared={prediction} special_color={true} />
          </div>

          <div className="stakedBarChartWrap">
            <div className="cardRow">
              <span className="cardRow__item">За прошлый месяц:</span>
              <span className="cardRow__item text-right"><span className="blackText">{current_indicators} {unit}</span></span>
            </div>
            <StakedBarChart current_indicators={current_indicators} compared={prediction} />
          </div>

          <div className="stakedBarChartWrap">
            <div className="cardRow">
              <span className="cardRow__item">Среднее за год:</span>
              <span className="cardRow__item text-right"><span className="blackText">{current_indicators} {unit}</span></span>
            </div>
            <StakedBarChart current_indicators={current_indicators} compared={prediction} />
          </div>

          <div className="cardBtnsWrap">
            <div className="col-md-6">
            <Popup
                className="btn btnStyle btnStyle--сolorLess"
                content={(
                  <LineChart />
                )}
            >Подробнее</Popup>
            </div>
            <div className="col-md-6">
              <Link to={'/payment'}><Button className="btn btnStyle btnStyle--сolor">Оплатить</Button></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Service;
