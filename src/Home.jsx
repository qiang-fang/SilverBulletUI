import React from 'react';

//import './buttons.css'
//import image from '../images/Acadia.jpg'

import { BrowserRouter, Route, Link } from 'react-router-dom'
import Dashboard from './DashboardTicket.jsx'
import Issues from './IssueList.jsx'

class Home extends React.Component {
  render() {
    return (
      <div><h1>Welcome to Silver ScrumBoard</h1>
        <span>
          <Link to={`/dashboard`}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={Dashboard}
            >
              My Dashboard
          </button>
          </Link>
          <Link to={`/issues`}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={Issues}
            >
              BackLog
          </button>
          </Link>
        </span>
      </div>
    );
  }
}

export default Home;
