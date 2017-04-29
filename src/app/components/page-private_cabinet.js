import React from 'react';
import { Link } from 'react-router';

// Import custom components
import Page from './page';
import Popup from './popup';
import jsondb from '../data/jsondb';

// Import charts
import LineChart from './line-chart';
import PieChart from './pie-chart';
import StakedBarChart from './stakedbar-chart';

import FormCreateEntity from './form-create_entity';

//CSS imports
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

function Havings(props){
  return (
    <div className="row havings">
      {
        props.jsondb[0].havings.map((entity, index) =>
          (
            <div className="col-md-4" key={index}>
              <div className="cardStyle cardStyle--withBtns objectWrap">
                <div><strong className="objectName blackText">{entity.entity}</strong></div>
                <small className="objectTitle">система {'"' + entity.system + '"'}
                </small>
                <div className="row objectServices">
                  {
                    entity.services.map((service, ind) =>
                      (
                        <p className="col-md-6 objectServicesWrap" key={ind}>
                          <div><small>{service.name}</small></div>
                          <span className="blackText">{service.current_indicators} {service.unit}</span>
                        </p>
                      )
                    )
                  }
                </div>
                <div className="row">
                  <div className="col-md-12">

                    <div className="stakedBarChartWrap">
                      <div className="cardRow">
                        <span className="cardRow__item">За месяц:</span>
                        <span className="cardRow__item text-right blackText">300 кВт</span>
                      </div>
                      <StakedBarChart current_indicators={300} compared={400} special_color={true} />
                    </div>

                    <div className="stakedBarChartWrap">
                      <div className="cardRow">
                        <span className="cardRow__item">За прошлый месяц:</span>
                        <span className="cardRow__item text-right blackText">200 кВт</span>
                      </div>
                      <StakedBarChart current_indicators={200} compared={400} />
                    </div>

                    <div className="stakedBarChartWrap">
                      <div className="cardRow">
                        <span className="cardRow__item">Среднее за год:</span>
                        <span className="cardRow__item text-right blackText">250 кВт</span>
                      </div>
                      <StakedBarChart current_indicators={250} compared={400} />
                    </div>
                  </div>
                </div>
                <div className="cardBtnsWrap">
                  <div className="col-md-6">
                    <Link to={'/entity?entity=' + entity.translit}><Button className="btn btnStyle btnStyle--сolorless">Подробнее</Button></Link>
                  </div>
                  <div className="col-md-6">
                    <Link to={'/payment'}><Button className="btn btnStyle btnStyle--сolor">Оплатить</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          )
        )
      }
    </div>
  );
}

class PC extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      scaleItems: 7
    }
  }

  render(){
    var totalData = {
      day: [25, 15, 25, 12, 45, 25, 30, 12, 25, 15, 25, 12, 45, 25, 30, 12, 25, 15, 25, 12, 45, 25, 30, 12 ],
      week: [250, 120, 277, 234, 127, 163, 290],
      month: [350, 400, 277, 234, 327, 123, 300, 350, 400, 277, 234, 327, 300, 350, 400, 277, 234, 327, 123, 300, 350, 400, 277, 234, 327, 123, 300, 400, 277, 234, 327]
    }
    return(
      <Page page_class={(this.props.route.path).slice(1)}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2><i className="fa fa-bar-chart" aria-hidden="true"></i><span>Статистика расходов</span></h2>
              <div className="row">
                <div className="col-md-8">
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
                          <option value="dacha">Дача</option>
                          <option value="kvartira">Квартира</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <LineChart data={totalData} />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="cardStyle">
                    <div className="row">
                      <div className="col-md-6">
                        <small>Начисленно:</small>
                        <h4 className="blackText">25 000 руб</h4>
                      </div>
                      <div className="col-md-6"><Link to={'/payment'}><Button className="btn btnStyle btnStyle--small btnStyle--сolorless">Оплатить</Button></Link></div>
                    </div>
                    <div className="row chartWrap">
                      <div className="col-md-6">
                        <small>Прогноз:</small><br/>
                        <span className="blackText">30 000 руб</span>
                      </div>
                      <div className="col-md-6">
                        <small>В среднем за год:</small><br/>
                        <span className="blackText">30 000 руб</span>
                      </div>
                    </div>
                    <div className="chartWrap text-center">
                      <PieChart />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="row align-items-center">
                <div className="col-md-8">
                  <h2><i className="fa fa-bar-chart" aria-hidden="true"></i><span>Мои объекты</span></h2>
                </div>
                <div className="col-md-4 text-right">
                  <Popup
                      className="btn btnStyle btnStyle--сolor"
                      content={(
                        <FormCreateEntity />
                      )}

                  >Добавить объект</Popup>
                </div>
              </div>

              <Havings jsondb={jsondb} />

            </div>
          </div>
        </div>
      </Page>
    );
  }
}

module.exports = PC;
