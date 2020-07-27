import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"



class NavBar extends Component {
  constructor() {
    super();
    this.state = { open: false };
  }

  componentDidMount() {
    console.log('hello');
  }

  
  render() {
    return (

        <div className="navBar">
            Silver Bullet
        </div>
    );
  }
}

export default (NavBar);
