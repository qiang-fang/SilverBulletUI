import React from 'react';
import URLSearchParams from 'url-search-params';
// import { Route } from 'react-router-dom';
// import { Label } from 'react-bootstrap';
import {
  Panel, Pagination, Button, Col,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueFilter from './IssueFilter.jsx';
// import IssueTable from './IssueTable.jsx';
import IssueTable from './TicketTable.jsx';
// import IssueAdd from './IssueAdd.jsx';
import IssueDetail from './IssueDetail.jsx';
import graphQLFetch from './graphQLFetch.js';
// import Toast from './Toast.jsx';
import withToast from './withToast.jsx';
import store from './store.js';

const SECTION_SIZE = 5;

function PageLink({
  params, page, activePage, children,
}) {
  params.set('page', page);
  if (page === 0) return React.cloneElement(children, { disabled: true });
  return (
    <LinkContainer
      isActive={() => page === activePage}
      to={{ search: `?${params.toString()}` }}
    >
      {children}
    </LinkContainer>
  );
}

class DashboardTicket extends React.Component {
  static async fetchData(match, search, showError) {
    const params = new URLSearchParams(search);
    const vars = { hasSelection: false, selectedId: 0 };
    if (params.get('status')) vars.status = params.get('status');
    const effortMin = parseInt(params.get('effortMin'), 10);
    if (!Number.isNaN(effortMin)) vars.effortMin = effortMin;
    const effortMax = parseInt(params.get('effortMax'), 10);
    if (!Number.isNaN(effortMax)) vars.effortMax = effortMax;

    const { params: { id } } = match;
    const idInt = parseInt(id, 10);
    if (!Number.isNaN(idInt)) {
      vars.hasSelection = true;
      vars.selectedId = idInt;
    }

    let page = parseInt(params.get('page'), 10);
    if (Number.isNaN(page)) page = 1;
    vars.page = page;

    const query = `query issueList(
      $status: StatusType
      $effortMin: Int
      $effortMax: Int
      $hasSelection: Boolean!
      $selectedId: Int!
      $page: Int
    ) {
      issueList(
        status: $status
        effortMin: $effortMin
        effortMax: $effortMax
        page: $page
      ) {
        issues {
          id title 
          status owner
          created effort due
        }
        pages
      }
      issue(id: $selectedId) @include (if : $hasSelection) {
        id description
      }
    }`;
    const data = await graphQLFetch(query, vars, showError);
    return data;
  }

  constructor() {
    super();
    // const issues = store.initialData ? store.initialData.issueList.issues : null;
    // const selectedIssue = store.initialData
    //   ? store.initialData.issue
    //   : null;
    const initialData = store.initialData || { issueList: {} };
    const {
      issueList: { issues, pages }, issue: selectedIssue,
    } = initialData;

    const newIssues = issues.filter(issue => issue.status === 'New');
    const assignedIssues = issues.filter(issue => issue.status === 'Assigned');
    const fixedIssues = issues.filter(issue => issue.status === 'Fixed');

    delete store.initialData;
    this.state = {
      issues,
      newIssues,
      assignedIssues,
      fixedIssues,
      selectedIssue,
      pages,
      // toastVisible: false,
      // toastMessage: ' ',
      // toastType: 'info',
    };
    // this.createIssue = this.createIssue.bind(this);
    this.assignIssue = this.assignIssue.bind(this);
    this.fixIssue = this.fixIssue.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    // this.showSuccess = this.showSuccess.bind(this);
    // this.showError = this.showError.bind(this);
    // this.dismissToast = this.dismissToast.bind(this);
  }

  // This method is called as soon as the IssueList component’s representation has been
  // converted and inserted into the DOM
  componentDidMount() {
    const { issues } = this.state;
    if (issues == null) this.loadData();
  }

  componentDidUpdate(prevProps) {
    // const { location: { search: prevSearch } } = prevProps;
    console.log('inside component did update.');
    const {
      location: { search: prevSearch },
      match: { params: { id: prevId } },
    } = prevProps;
    const { location: { search }, match: { params: { id } } } = this.props;
    if (prevSearch !== search || prevId !== id) {
      this.loadData();
    }
  }

  // will replace this with an API call to the server
  async loadData() {
    const { location: { search }, match, showError } = this.props;
    const data = await DashboardTicket.fetchData(match, search, showError);
    if (data) {
      this.setState({
        issues: data.issueList.issues,
        selectedIssue: data.issue,
        pages: data.issueList.pages,
      });
    }
  }

  async assignIssue(id) {
    const query = `mutation issueClose($id: Int!) {
      issueUpdate(id: $id, changes: { status: Assigned }) {
        id title status owner
        effort created due description
      }
    }`;
    const { issues } = this.state;
    console.log('issues in assignissue function: ', issues);
    const { showError } = this.props;
    console.log('about to break');

    //find index
    let index;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < issues.length; i++) {
      if (issues[i].id === id) {
        index = i;
      }
    }

    const data = await graphQLFetch(query, { id: issues[index].id }, showError);
    if (data) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        console.log('newLIst:', newList);
        // var index;
        // eslint-disable-next-line no-plusplus

        newList[index] = data.issueUpdate;
        
        console.log('newLIst updated:',newList);

        const newIssues = newList.filter(issue => issue.status === 'New');
        const assignedIssues = newList.filter(issue => issue.status === 'Assigned');
        const fixedIssues = newList.filter(issue => issue.status === 'Fixed');

        return {
          issues: newList, newIssues, assignedIssues, fixedIssues,
        };
      });
    } else {
      this.loadData();
    }
  }

  async closeIssue(index) {
    const query = `mutation issueClose($id: Int!) {
      issueUpdate(id: $id, changes: { status: Closed }) {
        id title status owner
        effort created due description
      }
    }`;
    const { issues } = this.state;
    const { showError } = this.props;
    const data = await graphQLFetch(query, { id: issues[index].id }, showError);
    if (data) {
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        newList[index] = data.issueUpdate;
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }

  async deleteIssue(index) {
    const query = `mutation issueDelete($id: Int!) {
    issueDelete(id: $id)
    }`;
    const { showSuccess, showError } = this.props;
    const { issues } = this.state;
    const { location: { pathname, search }, history } = this.props;
    const { id } = issues[index];
    const data = await graphQLFetch(query, { id }, showError);
    if (data && data.issueDelete) {
      // showSuccess(`Deleted issue ${id} successfully.`);
      const undoMessage = (
        <span>
          {`Deleted issue ${id} successfully.`}
          <Button bsStyle="link" onClick={() => this.restoreIssue(id)}>
            UNDO
          </Button>
        </span>
      );
      showSuccess(undoMessage);
      this.setState((prevState) => {
        const newList = [...prevState.issues];
        if (pathname === `/issues/${id}`) {
          history.push({ pathname: '/issues', search });
        }
        newList.splice(index, 1);
        return { issues: newList };
      });
    } else {
      this.loadData();
    }
  }

  async restoreIssue(id) {
    const query = `mutation issueRestore($id: Int!) {
    issueRestore(id: $id)
    }`;
    const { showSuccess, showError } = this.props;
    const data = await graphQLFetch(query, { id }, showError);
    if (data) {
      showSuccess(`Issue ${id} restored successfully.`);
      this.loadData();
    }
  }

  render() {
    const {
      issues, newIssues, assignedIssues, fixedIssues,
    } = this.state;
    if (issues == null) return null;
    if (newIssues == null) return null;
    if (assignedIssues == null) return null;
    if (fixedIssues == null) return null;

    // const { match } = this.props;
    // const { selectedIssue } = this.state;
    // const { toastVisible, toastType, toastMessage } = this.state;
    const { selectedIssue, pages } = this.state;
    const { location: { search } } = this.props;
    const params = new URLSearchParams(search);
    let page = parseInt(params.get('page'), 10);
    if (Number.isNaN(page)) page = 1;
    const startPage = Math.floor((page - 1) / SECTION_SIZE) * SECTION_SIZE + 1;
    const endPage = startPage + SECTION_SIZE - 1;
    const prevSection = startPage === 1 ? 0 : startPage - SECTION_SIZE;
    const nextSection = endPage >= pages ? 0 : startPage + SECTION_SIZE;
    const items = [];
    for (let i = startPage; i <= Math.min(endPage, pages); i += 1) {
      params.set('page', i);
      items.push((
        <PageLink key={i} params={params} activePage={page} page={i}>
          <Pagination.Item>{i}</Pagination.Item>
        </PageLink>
      ));
    }
    return (
      <React.Fragment>
        <Panel>
          <Panel.Heading>
            <Panel.Title toggle>Filter</Panel.Title>
          </Panel.Heading>
          <Panel.Body collapsible>
            <IssueFilter urlBase="/issues" />
          </Panel.Body>
        </Panel>
        {/* <h1><Label>Issue Tracker</Label></h1> */}
        {/* <IssueFilter /> */}
        {/* <hr /> */}

        {/* <Panel>
          <IssueTable
            issues={issues}
            closeIssue={this.closeIssue}
            deleteIssue={this.deleteIssue}
          />
        </Panel> */}

        <Col>
          <Panel>
            <Panel.Heading>
              <Panel.Title>New</Panel.Title>
            </Panel.Heading>
            <IssueTable
              issues={newIssues}
              assignIssue={this.assignIssue}
              deleteIssue={this.deleteIssue}
            />
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Assigned</Panel.Title>
            </Panel.Heading>
            <IssueTable
              issues={assignedIssues}
              closeIssue={this.closeIssue}
              deleteIssue={this.deleteIssue}
            />
          </Panel>
        </Col>
        <Col>
          <Panel>
            <Panel.Heading>
              <Panel.Title>Fixed</Panel.Title>
            </Panel.Heading>
            <IssueTable
              issues={fixedIssues}
              closeIssue={this.closeIssue}
              deleteIssue={this.deleteIssue}
            />
          </Panel>
        </Col>


        {/* <hr /> */}
        {/* <IssueAdd createIssue={this.createIssue} /> */}
        {/* <hr /> */}
        {/* <Route path={`${match.path}/:id`} component={IssueDetail} /> */}
        <IssueDetail issue={selectedIssue} />
        {/* <Toast
          showing={toastVisible}
          onDismiss={this.dismissToast}
          bsStyle={toastType}
        >
          {toastMessage}
        </Toast> */}
        <Pagination>
          <PageLink params={params} page={prevSection}>
            <Pagination.Item>{'<'}</Pagination.Item>
          </PageLink>
          {items}
          <PageLink params={params} page={nextSection}>
            <Pagination.Item>{'>'}</Pagination.Item>
          </PageLink>
        </Pagination>
      </React.Fragment>
    );
  }
}

const DashboardTicketWithToast = withToast(DashboardTicket);
DashboardTicketWithToast.fetchData = DashboardTicket.fetchData;
export default DashboardTicketWithToast;
