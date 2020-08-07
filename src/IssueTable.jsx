import React from 'react';
import { withRouter } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  Button, Glyphicon, Tooltip, OverlayTrigger, Table,
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
class IssueRowPlain extends React.Component {
  render() {
    const {
      issue, location: { search }, nextStage, deleteIssue, index, id,
    } = this.props;
    const user = this.context;
    const disabled = !user.signedIn;

    const selectLocation = { pathname: `/issues/${issue.id}`, search };
    const editTooltip = (
      <Tooltip id="close-tooltip" placement="top">Edit Issue</Tooltip>
    );
    const closeTooltip = (
      <Tooltip id="close-tooltip" placement="top">Next Stage</Tooltip>
    );
    const deleteTooltip = (
      <Tooltip id="delete-tooltip" placement="top">Delete Issue</Tooltip>
    );
    function onNext(e) {
      e.preventDefault();
      nextStage(id);
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
            <Button disabled={disabled} bsSize="xsmall" onClick={onNext}>
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
    );
  }
}

IssueRowPlain.contextType = UserContext;
const IssueRow = withRouter(IssueRowPlain);
delete IssueRow.contextType;

export default function IssueTable({ issues, nextStage, deleteIssue }) {
  const IssueRows = issues.map((issue, index) => (
    <IssueRow
      key={issue.id}
      issue={issue}
      nextStage={nextStage}
      deleteIssue={deleteIssue}
      index={index}
      id={issue.id}
    />
  ));
  return (
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
        {IssueRows}
      </tbody>
    </Table>
  );
}
