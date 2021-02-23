import React from 'react';
import ReactDOM from 'react-dom';
<% if (router) { %>
import { BrowserRouter as Router } from "react-router-dom";
<% } %>
<% if (redux) { %>
import { Provider } from "react-redux";
<% } %>
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

<% if (redux) { %>
import { ConfigureStore } from "./Redux/ConfigureStore";

const store = ConfigureStore();
<% } %>

ReactDOM.render(
  <React.StrictMode>
    <% if (redux) { %>
      <Provider store={store}>
    <% } %>
      <% if (router) { %>
      <Router>
      <% } %>
        <App />
      <% if (router) { %>
      </Router>
      <% } %>
    <% if (redux) { %>
      </Provider>
    <% } %>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
