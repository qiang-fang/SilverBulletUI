import React from 'react';
import {
  Navbar, Nav, NavItem, NavDropdown,
  MenuItem, Glyphicon,
  Grid, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import Contents from './Contents.jsx';
import IssueAddNavItem from './IssueAddNavItem.jsx';
import DashboardAddNavItem from './DashboardAddNavItem.jsx';
import Search from './Search.jsx';
import SignInNavItem from './SignInNavItem.jsx';
import UserContext from './UserContext.js';
import graphQLFetch from './graphQLFetch.js';
import store from './store.js';

function NavBar({ user, onUserChange }) {
  return (
    <Navbar fluid>
      <Navbar.Header>
        <Link to="/home">
          <Navbar.Brand classname="hi">Silverbullet Scrumboard</Navbar.Brand>
        </Link>
      </Navbar.Header>
      <Nav pullRight>
        <IssueAddNavItem user={user} />
        <DashboardAddNavItem user={user} />
        <SignInNavItem user={user} onUserChange={onUserChange} />
        <NavDropdown
          id="user-dropdown"
          title={<Glyphicon glyph="option-vertical" />}
          noCaret
        >
          <LinkContainer to="/about">
            <MenuItem>About</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
}

export default class Page extends React.Component {
  static async fetchData(cookie) {
    const query = `query { user {
    signedIn givenName
    }}`;
    const data = await graphQLFetch(query, null, null, cookie);
    return data;
  }

  constructor(props) {
    super(props);
    const user = store.userData ? store.userData.user : null;
    delete store.userData;
    this.state = { user };
    this.onUserChange = this.onUserChange.bind(this);
  }

  async componentDidMount() {
    // const apiEndpoint = window.ENV.UI_AUTH_ENDPOINT;
    // const response = await fetch(`${apiEndpoint}/user`, {
    //   method: 'POST',
    //   credentials: 'include',
    // });
    // const body = await response.text();
    // const result = JSON.parse(body);
    // const { signedIn, givenName } = result;
    // this.setState({ user: { signedIn, givenName } });
    const { user } = this.state;
    if (user == null) {
      const data = await Page.fetchData();
      this.setState({ user: data.user });
    }
  }

  onUserChange(user) {
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    if (user == null) return null;
    return (
      <div>
        <NavBar user={user} onUserChange={this.onUserChange} />
        <Grid fluid>
          <UserContext.Provider value={user}>
            <Contents />
          </UserContext.Provider>
        </Grid>
      </div>
    );
  }
}
