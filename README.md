## PATIENTS REPOSITORY

PATIENTS REPOSITORY is an AngularJS application for searching patients and viewing their details.

This application is supported and tested in Google Chrome, Mozilla Firefox and Edge browser.

### Running directly on any server
To run the application from your local server, follow the below steps :
* Copy and paste the *patients-repo* folder under your server's root.
* Open the app using  the url: 
  *http://{serverUrl: port}/patients-repo/app/#/index*

### Requirements
* nodejs

### Development
Run the following command to set up the development environment and start coding. It will install the required node and bower modules.
```
$ npm start
```
Run the application using the following url : 
```
http://localhost:9999/#/index

```
### Running Unit tests
Run the following command to run jasmine unit tests.
```
npm test
```

### Folder Structure
```
app/                    --> all of the source files for the application
  common/               --> all common components and modules
    components/         --> all reusable components
      dropdown          --> Custom reusable typeahead-dropdown component
     services/          --> all application services
       patientsService  --> service to fetch list of patients
      utils/            --> common utility/helper classes
       ng-escape        --> for adding esc event on elements
  data/                 --> all data files
    patientsList.json   --> json file that contains patients list
  navbar/               --> contains application navigation bar & search component
  patient-details/      --> shows the details of the selected patient
  root/                 --> root page of the application
  app.js                --> main application module
  index.html            --> app layout file (the main html template file of the app)
karma.conf.js         --> config file for running unit tests with Karma
```


