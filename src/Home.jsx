import React from 'react';

class Home extends React.Component {

  render() {
    return (
      <div><h1>Welcome to Silver ScrumBoard</h1>
        <span>
          <button type="button" class="btn btn-primary">My Dashboard</button>
          <button type="button" class="btn btn-primary">BackLog</button>
        </span>
      </div>
    );
  }
}

export default Home;
