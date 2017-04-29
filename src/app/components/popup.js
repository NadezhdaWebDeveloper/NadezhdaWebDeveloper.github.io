import React from "react";
import ReactDOM from "react-dom";

class Popup extends React.Component{
  constructor(props) {
    super(props);
    this.callPopup = this.callPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  callPopup(){
    document.body.appendChild(this.modalTarget);
    this._render();
  }

  closePopup(){
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  componentDidMount() {
    this.modalTarget = document.createElement('div');
    this.modalTarget.className = 'popup';
  }

  _render(){
    ReactDOM.render(
      <div className="popup-overlay">
          <div className="popup-content">
              { this.props.content }
              <span className="closePopup" onClick={this.closePopup}><i className="fa fa-times" aria-hidden="true"></i></span>
          </div>
      </div>,
      this.modalTarget
    );
  }

  render(){
    return(
      <div className={this.props.className} onClick={this.callPopup}>
        {this.props.children}
      </div>
    );
  }
}

module.exports = Popup;
