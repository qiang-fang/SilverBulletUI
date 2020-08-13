/* eslint-disable react/prefer-stateless-function */
import React from 'react';

// import './buttons.css';
// import image from '../images/Acadia.jpg'

// import { BrowserRouter, Route, Link } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Dashboard from './DashboardTicket.jsx';
import Issues from './IssueList.jsx';

class Home extends React.Component {
  render() {
    // const image = require('../images/BackLog.png');
    const mystyle = {
      width: '100%',
      height: '100%',
      'text-align': 'center',
    };
    return (
      <div style={mystyle}>
        <h1>Welcome to Silver Bullet ScrumBoard</h1>
        <span>
          <a href="/dashboard">
            <button
              type="button"
              className="btn btn-primary"
              onClick={Dashboard}
            >
              My Dashboard
            </button>
          </a>
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <span>
          <a href="/issues">
            <button
              type="button"
              className="btn btn-primary"
              onClick={Issues}
            >
              BackLog
            </button>
          </a>
        </span>
      </div>
    );
  }
}

export default Home;
