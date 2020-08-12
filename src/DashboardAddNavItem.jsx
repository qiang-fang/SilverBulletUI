import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import {
  NavItem, Glyphicon, Modal, Form, FormGroup, FormControl, ControlLabel,
  Button, ButtonToolbar, Tooltip, OverlayTrigger,
} from 'react-bootstrap';

import graphQLFetch from './graphQLFetch.js';
import withToast from './withToast.jsx';

class DashboardAddNavItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showing: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  showModal() {
    this.setState({ showing: true });
  }

  hideModal() {
    this.setState({ showing: false });
  }

  async handleSubmit(e) {
    e.preventDefault();
    this.hideModal();
    const form = document.forms.dashboardAdd;
    const dashboard = {
      title: form.title.value,
      label: form.label.value,
    };
    const query = `mutation dashboardAdd($dashboard: DashboardInputs!) {
      dashboardAdd(dashboard: $dashboard) {
        id
      }
    }`;

    const { showError } = this.props;
    const data = await graphQLFetch(query, { dashboard }, showError);
    if (data) {
      const { history } = this.props;
      //history.push(`/dashboard/${data.dashboardAdd.id}`);
      // history.push(`/dashboard`);
      window.location.href = '/dashboard';
    }
  }

  render() {
    const { showing } = this.state;
    const { user: { signedIn } } = this.props;
    return (
      <React.Fragment>
        <NavItem disabled={!signedIn} onClick={this.showModal}>
          <OverlayTrigger
            placement="left"
            delayShow={1000}
            overlay={<Tooltip id="create-issue">Create a new dashboard here!</Tooltip>}
          >
            <button type="button" className="btn btn-primary">Create Dashboards</button>
          </OverlayTrigger>
        </NavItem>
        <Modal keyboard show={showing} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Create A Dashboard</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form name="dashboardAdd">
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl name="title" autoFocus />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Label</ControlLabel>
                <FormControl name="label" />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <ButtonToolbar>
              <Button
                type="button"
                bsStyle="primary"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button bsStyle="link" onClick={this.hideModal}>Cancel</Button>
            </ButtonToolbar>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default withToast(withRouter(DashboardAddNavItem));
