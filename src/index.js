import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Homepage from './HomePage/homepage1';
import App from './HomePage/App/app';
import Web from './HomePage/Web/web';
import Login from './Admin/Login/login'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

class Indexpage extends React.Component {
  render(){
    return(
      <div>
        <Router>
          <Route path="/homepage" component={Homepage}></Route>
          <Route path="/app" component={App}></Route>
          <Route path="/web" component={Web}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" exact component={Homepage}></Route>
        </Router>
      </div>
    )
  }
}

ReactDOM.render(
  <Indexpage></Indexpage>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
