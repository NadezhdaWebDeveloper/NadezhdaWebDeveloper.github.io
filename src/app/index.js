import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, Link } from 'react-router';

// Import custom components
import PC from './components/page-private_cabinet';
import Entity from './components/page-entity';
import Payment from './components/page-payment';

//CSS requires
require('./css/index.css');

// SETUP ROUTING
var App = React.createClass({
    render: function(){
        return(
            <Router history={browserHistory}>
                <Route path={"/"} component={PC}></Route>
                <Route path={"/entity"} component={Entity}></Route>
                <Route path={"/payment"} component={Payment}></Route>
            </Router>
        );
    }
});


ReactDOM.render(<App />, document.getElementById('root'));
