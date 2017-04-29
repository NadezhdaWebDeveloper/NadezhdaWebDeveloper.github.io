import React from 'react';
import { Link } from 'react-router';

function Footer(){
  return(
    <footer>
      <div className="footerTop">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-1">
              <div className="logoWrap">
                <Link to={'/'} className="logo">M4M</Link>
              </div>
            </div>
            <div className="col-md-9">
              <nav className="nav footerNav footerMenu">
                <Link to='/' className="nav-link footerMenuItem">О компании</Link>
                <Link to='/' className="nav-link footerMenuItem">Контакты</Link>
                <Link to='/' className="nav-link footerMenuItem">Новости</Link>
                <Link to='/' className="nav-link footerMenuItem">Инвесторам</Link>
                <Link to='/' className="nav-link footerMenuItem">Партнерам</Link>
                <Link to='/' className="nav-link footerMenuItem">Юридическая информация</Link>
              </nav>
            </div>
            <div className="col-md-2">
              <nav className="socialsNav text-right">
                <a href="https://www.facebook.com/crepla.ua"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                <a href="/"><i className="fa fa-instagram" aria-hidden="true"></i></a>
                <a href="/"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                <a href="https://vk.com/crepla"><i className="fa fa-vk" aria-hidden="true"></i></a>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              2к17 Все права защищены
            </div>
            <div className="col-md-6 text-right">
              <span>Разработка сайта: </span>
              <a href="http://www.crepla.com/"><img className="creplaLogo" src="/app/images/crepla-logo.png" alt="CrePla" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

module.exports = Footer;
