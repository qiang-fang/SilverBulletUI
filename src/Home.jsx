import React from 'react';
// import '../styles/buttons.css'
// import Link from 'react-router-dom'
import Dashboard from './Dashboard.jsx'
import Issues from './IssueList.jsx'

class Home extends React.Component {

  render() {
    return (
      <div><h1>Welcome to Silver ScrumBoadrd</h1>
        <span>
          {/*<Link to={`/dashboard`}>*/}
          <button 
            type="button" 
            class="btn btn-primary" 
            onClick={Dashboard}
            >
            My Dashboard
          </button>
          {/*</Link>*/}
          <button type="button" class="btn btn-primary" onClick={Issues}>BackLog</button>
        </span>
      </div>
    );
  }
}

export default Home;
