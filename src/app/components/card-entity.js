import React from 'react';
import { Link } from 'react-router';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

class EntityCard extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className="cardStyle objectWrap">
        <div className="objectName">
          Домик на даче
        </div>
        <div className="objectTitle">
          система "умный дом"
        </div>
        <div className="row">
          <div className="col-md-6">
            Электричество
          </div>
          <div className="col-md-6">
            Электричество
          </div>
          <div className="col-md-6">
            Электричество
          </div>
          <div className="col-md-6">
            Электричество
          </div>
          <div className="col-md-6">
            Электричество
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            диаграмма
          </div>
        </div>
        <div className="row cardBtnsWrap">
          <div className="col-md-6">
            <Link to={'/entity'}><Button className="btn btnStyle btnStyle--сolorless">Подробнее</Button></Link>
          </div>
          <div className="col-md-6">
            <Link to={'/payment'}><Button className="btn btnStyle btnStyle--сolor">Оплатить</Button></Link>
          </div>
        </div>
      </div>
    );
  }
}

module.exports = EntityCard;
