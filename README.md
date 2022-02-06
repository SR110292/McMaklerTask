# McMaklerTask #

WINDOWS SETUP:
1. Please install Node.js in the system 
2. Place the project folder in the local system
3. Go to the command prompt from the project folder
4. Run the command "npm install" to install all the dependencies
5. Once the installation is completed, please run the command "npx cypress run --headed" (it may take some time on triggering the test)
6. Once the test run is completed, please run the command "node cucumber-html-reports" to generate cucumber reports
7. The cucumber report would be generated in the folder "./reports/cucumber-html-report.html"

Test Scenarios:
All the E2E test scenarios are in the below feature files. Both these feature files are in the 
folder "./cypress/integration"
	1. AddRecord.feature - Add advertisement test scenarios are covered in this file.
	2. EditRecord.feature - Edit advertisement test scenarios are covered in this file.


Batch files: 
The below batch files are placed in the project folder. Double click on them in order to run them.
   runCypressDefault.bat - To run the cypress tests in default browser (headed mode)
   runCypressEdgeHeaded.bat - To run the cypress tests in edge browser (headed mode)
   openCypress.bat - To open the cypress window
   generateCucumberReport.bat - To generate the Cucumber report on the last run.

Failures:
Please find below the bugs identified, due to which some of the test scripts are failing consistently.
1. There is no server side validation for any of the input fields. Hence most of the API tests are failed. Some of them are below.
	* Advertisement Name field is accepting special character through API request
	* Advertisement Name field is accepting more than 50 characters through API request
	* Rooms and Price fields are accepting non-numerical characters throught API request
	* Status field is also not throwing any error when providing anyother value other than "true" or "false"
	* Also no error thrown if mandatory fields are sent as blank values.

2. In UI, we have an option to select negative value in the rooms field which is not as expected. 
	