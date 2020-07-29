import React from 'react';
//import '../styles/buttons.css'


class Home extends React.Component {

  render() {
    return (
      <div><h1>Welcome to Silver ScrumBoadrd</h1>
      <img src={table} alt="Logo" />;
        <span>
          <button type="button" class="btn btn-primary">My Dashboard</button>
          <button type="button" class="btn btn-primary">BackLog</button>
        </span>
      </div>
    );
  }
}

export default Home;
