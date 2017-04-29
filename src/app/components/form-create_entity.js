import React from 'react';

class FormCreateEntity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      system: '"умный дом"',
      msg: '',
      electric: false,
      waterhot: false,
      watercold: false,
      gas: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('Название: ' + this.state.name +
          '\nCистема: ' + this.state.system +
          '\nСообщение: ' + this.state.msg +
          '\nСервисы: ' +
          '\nЭлектричество: ' + this.state.electric +
          '\nГорячая вода: ' + this.state.waterhot +
          '\nХолодная вода: ' + this.state.watercold +
          '\nГаз: ' + this.state.gas);
  }

  render() {
    return (
      <div className="entityFormWrap">
        <h3 className="text-center">Форма для создания объекта</h3>
        <form onSubmit={this.handleSubmit} id="entityForm" className="entityForm">
          <span className="entityForm__item">
            <label htmlFor="name">Название:</label>
            <input type="text" name="name" value={this.state.value} onChange={this.handleChange} />
          </span>
          <span className="entityForm__item">
            <label htmlFor="systems">Система:</label>
            <select name="system" value={this.state.system} onChange={this.handleChange}>
              <option value="умный дом">умный дом</option>
              <option value="крутой дом">крутой дом</option>
              <option value="красивый дом">красивый дом</option>
            </select>
          </span>
          <span className="entityForm__item">
            <span>Отметьте службы, которые Вы хотели бы подключить.</span>
            <div className="checkboxWrap">
              <input name="electric" type="checkbox" checked={this.state.electric} onChange={this.handleChange} />
              <label htmlFor="electric">Электричество</label>
            </div>
            <div className="checkboxWrap">
              <input name="waterhot" type="checkbox" checked={this.state.waterhot} onChange={this.handleChange} />
              <label htmlFor="waterhot">Горячая вода</label>
            </div>
            <div className="checkboxWrap">
              <input name="watercold" type="checkbox" checked={this.state.watercold} onChange={this.handleChange} />
              <label htmlFor="watercold">Холодная вода</label>
            </div>
            <div className="checkboxWrap">
              <input name="gas" type="checkbox" checked={this.state.gas} onChange={this.handleChange} />
              <label htmlFor="gas">Газ</label>
            </div>
          </span>
          <span className="entityForm__item">
            <label htmlFor="msg">Сообщение:</label>
            <textarea name="msg" value={this.state.value} onChange={this.handleChange} ></textarea>
          </span>
          <span className="entityForm__item text-center">
            <button className="btn btnStyle btnStyle--сolor">Создать</button>
          </span>
        </form>
      </div>
    );
  }
}

module.exports = FormCreateEntity;
