import React from 'react';

// Import custom components
import Page from './page';

function Payment(props){
  return(
    <Page page_class={(props.route.path).slice(1)}>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Страница оплаты</h1>
          </div>
        </div>
      </div>
    </Page>
  );
}

module.exports = Payment;
