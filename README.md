This is the front end code for my calendar app. It functions like any regular calendar app, it allows you to make appoints by date and time, name them, and add descriptions. 

The purpose of this app was to sharpen my full stack skills in order to prepare for my first chingu voyage. 

LIVE LINK: https://amazing-brattain-ac1e9a.netlify.app/

**To run this app locally**
1) fork and install my backend app **and follow the readme** at https://github.com/Tisdale511/chingu-calendar-backend

2) fork this repo into the folder of your choosing, but not into the same folder as the backend app. 

3) cd into the application folder, and inside components, in MainPage.js towards the top of the page, un-comment the the fetch with local host, and comment out the fetch with the heroku URL. In EventWindow.js, towards the top of the page there is a const = API_KEY. Uncomment the local host const, and comment out the the const with the heroku URL

4) You'll need the following dependencies installed to run the app: 
    "bootstrap": "^4.6.0",
    "react": "^17.0.2",
    "react-calendar": "^3.3.1",
    "react-dom": "^17.0.2",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "react-transition-group": "^4.4.1",
    "reactstrap": "^8.9.0",
    "web-vitals": "^1.0.1"



**Features**
A complete list of features can be found here: https://github.com/chingu-voyages/soloproject-tier3-ecalendar
