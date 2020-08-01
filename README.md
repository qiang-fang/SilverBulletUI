# Silver Bullet Scrumboard 
## Group Members:
Eric Cheng
Qiang Fang
Hui Li

UI Repository: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Segfault_UI
API Repository: https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject_Segfault_API

### If running on a Mac OS, open two terminal windows:
First, navigate to the API directory and run npm start to start the API.
Second, navigate tothe UI directory and run npm run dev-all
### If running on a Windows OS, open three terminal windows and execute in order:
First, navigate to the API directory and run npm start to start the API.
Second, navigate to the UI directory and run npm run watch-server-hmr to watch files in the UI for hot module replacement recompilation.
Third, navigate to the UI directory adn run npm start to start the UI.

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
