import React from 'react';
// import '../styles/buttons.css'
// import Link from 'react-router-dom'
import dashboard from './Dashboard'

class Home extends React.Component {

  render() {
    return (
      <div><h1>Welcome to Silver ScrumBoadrd</h1>
      <img src={table} alt="Logo" />;
        <span>
          {/*<Link to={`/dashboard`}>*/}
          <button 
            type="button" 
            class="btn btn-primary" 
            onClick={dashboard}
            >
            My Dashboard
          </button>
          {/*</Link>*/}
          <button type="button" class="btn btn-primary">BackLog</button>
        </span>
      </div>
    );
  }
}

export default Home;
