import React from 'react';
import ReactDOM from 'react-dom/client'; // Pastikan mengimpor dari 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // Membuat root baru
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
