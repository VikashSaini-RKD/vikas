// import React from 'react'
// import { createRoot } from 'react-dom/client';
// import App from './App'

// createRoot(document.getElementById('root')).render(<App/>);







// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import { Provider } from 'react-redux'
// import { store } from './app/store'

// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root'));

import React from 'react';
import { createRoot } from 'react-dom/client';
// import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById('root'))
  .render(
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>,
  );


