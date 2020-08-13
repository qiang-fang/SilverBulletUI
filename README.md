# Silver Bullet Scrumboard 
## Group Members:
- Eric Cheng
- Qiang Fang
- Hui Li

UI Repository: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Segfault_UI

API Repository: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Segfault_API

Heroku Links: https://silverbullet-ui-segfault.herokuapp.com


### If running on a Mac OS, open two terminal windows:
- First, navigate to the API directory and run npm start to start the API.
- Second, navigate tothe UI directory and run npm run dev-all
### If running on a Windows OS, open three terminal windows and execute in order:
- First, navigate to the API directory and run npm start to start the API.
- Second, navigate to the UI directory and run npm run watch-server-hmr to watch files in the UI for hot module replacement recompilation.
- Third, navigate to the UI directory and run npm start to start the UI.

## Iteration3:
### Application progress report:

In iteration 3, we took a deeper dive into the CRUD methods specifically on the Dashboard page: fetching data as well as updating data based on user preference. We also leverage CRUD methods to allow the user to create an issue to a specific dashboard.

We are able to make further feature enhancement on the filter component. Instead of having a drop-down of hard-coded values, we now have a drop-down that is now dynamic and is able to load values based on fetch data call, which gets real dashboard value such as title and ID and its rendered into the browse for a user to select when creating issues. We architecturally designed each component to capture its own state and synchronize states. We also tinker around with the UI specifically the UI table in the Dashboard page to create a table vertically.

### Member contributions:

- Eric Cheng:

Collaborated with team/shared code with the team on functions related to the dashboard page, the filter component, and issueEdit;

- Hui Li:

Collaborated with team/shared code with the team on functions related to the dashboard page, the filter component, and issueEdit; Implemented the UI and API for creating dashboards and tickets feature.

- Qiang Fang:

Collaborated with the team, implement dashboard page, filter, issueEdit page, backlog page. Implement UI and API; Share ideas and debugging. Deploy the project.

## Iteration 2:
### Summary of Work Completed:
- As we enter into Iteration 2 of the project we completed all the neccesary routings to the various components of the scrumboard application. After finalizing the structure of how UI of the application will be, we focused together as a collaboration on building the Dashboard component of the application. This includes having the ability to move the status of a ticket and will render automatically on the DOM. In iteration 2, we also explored shifting our backend to point to the database cloud but ran into some issues that we are working through via separate branches.

![Home2](/images/homepage.png)
![Dashboard2](/images/Dashboard2.png)

## Iteration 1:
### Eric Cheng's Contribution: 
- Focused on the Landing Page and Backlog page of the ScrumBoard Application. The landing page will allow you to route to certain pages of the application including the dashboard view Page, the backlog view Page, and the ability to create a dashbaord, which was a functionalty we decided to reuse. 
- Because the issuelist page becomes the backlog page, there was minimum changes on that end for iteration 1.0. 
- Having issues with importing images and css into the home page. Worked with a TA and thought it was a webpack versioning issue, but that did not resolve it. Still looking into this matter. Something related to the webpack.config.js

![Home](/images/Home.png)
![Backlog](/images/BackLog.png)

### Qiang Fang's Contribution: 
- Focused on Dashboard page, backend and MongoDB. The Dashboard page will allow you to view all tickets. Each ticket is listed in corresponding panel which indicates the current status of the ticket. Each ticket has a right-arrow button, the ticket can go to next stage on click the button. I am having issues with the button function.
- Creat MongoDB on Atlas with 3 tables: backlog, counters, dashboard. Then populate with test data and create the schema file.

![Dashboard](/images/Dashboard.png)

### Hui Li's Contribution: 
- Added two buttons on Homepage navigation bar for creating dashboards and tickets. Both two buttons are implemented with overlay trigger.
- Both Tickets and Dashboard creation are implemented as Modals, which can be accessed from every webpages.
- Disabled signIn feature for now will added that feature at last. Having issues with inserting a dashboard or a ticket into database. Will continued to alter the schema to make that happen.

![dashboardModal](/images/dashboardModal.png)
![ticketModal](/images/ticketModal.png)
