import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table, Panel,
} from 'react-bootstrap';
import UserContext from './UserContext.js';


// function IssueRow({ issue }) {
// const IssueRow = withRouter(({
//   issue,
//   location: { search },
//   closeIssue,
//   deleteIssue,
//   index,
// }) => {

// eslint-disable-next-line react/prefer-stateless-function
class TicketRowPlain extends React.Component {
  render() {
    const {
      issue, location: { search }, closeIssue, deleteIssue, index,
    } = this.props;
    const user = this.context;
    const disabled = !user.signedIn;

    const selectLocation = { pathname: `/issues/${issue.id}`, search };
    const editTooltip = (
      <Tooltip id="close-tooltip" placement="top">Edit Issue</Tooltip>
    );
    const closeTooltip = (
      <Tooltip id="close-tooltip" placement="top">Close Issue</Tooltip>
    );
    const deleteTooltip = (
      <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
    );
    function onClose(e) {
      e.preventDefault();
      // closeIssue(index);
      closeIssue(index);
    }
    function onDelete(e) {
      e.preventDefault();
      deleteIssue(index);
    }

    //   const issue = props.issue;
    const tableRow = (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.status}</td>
        <td>{issue.owner}</td>
        <td>{issue.created.toDateString()}</td>
        <td>{issue.effort}</td>
        <td>{issue.due ? issue.due.toDateString() : ''}</td>
        <td>{issue.title}</td>
        {/* <td><Link to={`/edit/${issue.id}`}>Edit</Link></td> */}
        <td>
          <LinkContainer to={`/edit/${issue.id}`}>
            <OverlayTrigger delayShow={1000} overlay={editTooltip}>
              <Button bsSize="xsmall">
                <Glyphicon glyph="edit" />
              </Button>
            </OverlayTrigger>
          </LinkContainer>
          {' '}
          {/* <NavLink to={selectLocation}>Select</NavLink> */}
          {/* {' | '} */}
          {/* <button type="button" onClick={() => { closeIssue(index); }}>
          Close
        </button> */}
          <OverlayTrigger delayShow={1000} overlay={closeTooltip}>
            <Button disabled={disabled} bsSize="xsmall" onClick={onClose}>
              {/* <Glyphicon glyph="remove" /> */}
              <Glyphicon glyph="arrow-right" />
            </Button>
          </OverlayTrigger>
          {/* {' | '} */}
          {' '}
          <OverlayTrigger delayShow={1000} overlay={deleteTooltip}>
            <Button disabled={disabled} bsSize="xsmall" onClick={onDelete}>
              <Glyphicon glyph="trash" />
            </Button>
          </OverlayTrigger>
          {/* <button type="button" onClick={() => { deleteIssue(index); }}>
          Delete
        </button> */}
        </td>
      </tr>
    );

    return (
      <LinkContainer to={selectLocation}>
        {tableRow}
      </LinkContainer>
      // { tableRow, status: issue.status }
    );
  }
}

TicketRowPlain.contextType = UserContext;
const IssueRow = withRouter(TicketRowPlain);
delete IssueRow.contextType;

export default function IssueTable({ issues, closeIssue, deleteIssue }) {
  const IssueRows = issues.map((issue, index) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      closeIssue={closeIssue}
      deleteIssue={deleteIssue}
      index={index}
    />
  ));
  // console.log(`print status::::::::: ${a}`);

  const newIssueRows = IssueRows.filter(issue => issue.status === 'New');
  const assignedIssueRows = IssueRows.filter(issue => issue.status === 'Assigned');
  const fixedIssueRows = IssueRows.filter(issue => issue.status === 'Fixed');

  return (
    <React.Fragment>
      <Panel>
        <Panel.Heading>
          <Panel.Title>New</Panel.Title>
        </Panel.Heading>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Owenr</th>
              <th>Created</th>
              <th>Effort</th>
              <th>Due Date</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {newIssueRows}
          </tbody>
        </Table>
      </Panel>
      <Panel>
        <Panel.Heading>
          <Panel.Title>Assigned</Panel.Title>
        </Panel.Heading>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Owenr</th>
              <th>Created</th>
              <th>Effort</th>
              <th>Due Date</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assignedIssueRows}
          </tbody>
        </Table>
      </Panel>
      <Panel>
        <Panel.Heading>
          <Panel.Title>Fixed</Panel.Title>
        </Panel.Heading>
        <Table bordered condensed hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Status</th>
              <th>Owenr</th>
              <th>Created</th>
              <th>Effort</th>
              <th>Due Date</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {fixedIssueRows}
          </tbody>
        </Table>
      </Panel>
    </React.Fragment>
  );
}
