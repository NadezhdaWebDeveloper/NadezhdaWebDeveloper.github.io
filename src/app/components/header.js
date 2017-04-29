import React from 'react';
import { Link } from 'react-router';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import { Button } from 'reactstrap';

import jsondb from '../data/jsondb';

function Header(){
  return(
    <header>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-1">
            <div className="logoWrap">
              <Link to={'/'} className="logo">M4M</Link>
            </div>
          </div>
          <div className="col-md-8">
            <nav className="nav headerNav headerMenu">
              <span className="menuItem">Объекты
                <ul className="headerSubMenu">
                  {
                    jsondb[0].havings.map((entity, index) =>
                      (
                        <Link to={'/entity?entity=' + entity.translit} key={index} >{entity.entity}</Link>
                      )
                    )
                  }
                </ul>
              </span>
              <Link className="nav-link menuItem" to='/'>Поставщикам</Link>
              <Link className="nav-link menuItem" to='/'>Финансы</Link>
              <Link className="nav-link menuItem" to='/'>Настройки</Link>
              <Link className="nav-link menuItem" to='/'>Помощь</Link>
            </nav>
          </div>
          <div className="col-md-3">
            <div className="userInfo">
              <span className="userInfo__name"><i className="fa fa-user-o" aria-hidden="true"></i> {jsondb[0].name}</span> <span className="userInfo__id">id {jsondb[0].id}</span> <i className="fa fa-power-off" aria-hidden="true"></i>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

module.exports = Header;
