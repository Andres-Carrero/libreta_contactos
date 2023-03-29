import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { configureAppStore } from './redux/store';
import App from './App';

const store = configureAppStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  //<React.StrictMode>
  <Provider store={store}>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossOrigin="anonymous"></link>
    <App />
  </Provider>
   
  
  //</React.StrictMode>
);
