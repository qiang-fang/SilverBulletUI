
import IssueList from './IssueList.jsx';
import IssueReport from './IssueReport.jsx';
import IssueEdit from './IssueEdit.jsx';
import About from './About.jsx';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import DashBoard from './Dashboard.jsx';

const routes = [
  { path: '/issues/:id?', component: IssueList },
  { path: '/edit/:id', component: IssueEdit },
  { path: '/report', component: IssueReport },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/dashboard', component: DashBoard },
  { path: '*', component: NotFound },
];
export default routes;
