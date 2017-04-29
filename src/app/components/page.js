import React from 'react';

// Import custom components
import Header from './header';
import Footer from './footer';

function Page(props){
  return(
    <div className={'page page_' + props.page_class}>
      <Header />

      <main className="mainContent">
        {props.children}
      </main>

      <Footer />
    </div>
  )
}

module.exports = Page;
