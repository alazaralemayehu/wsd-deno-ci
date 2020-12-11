                                    **Self-monitoring application**
**Tables used:**
```
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(320) NOT NULL,
  password CHAR(60) NOT NULL
);

create table report (
  id SERIAL PRIMARY KEY,
  rep_date DATE NOT NULL default CURRENT_DATE,
  sleep_hrs NUMERIC(4,2),
  sleep_qlty INTEGER,
  sports_hrs NUMERIC(4,2),
  study_hrs NUMERIC(4,2),
  eat_qlty INTEGER,
  gen_mood INTEGER,
  user_id INTEGER REFERENCES users(id)
)
```
**Indices:**
```
CREATE UNIQUE INDEX ON users((lower(email)));
CREATE INDEX report_date_idx ON report((rep_date::DATE));
```

**Application URL on Heroku:**
https://wsdfinalproject.herokuapp.com/

Executing the project locally:
1)	Create the database and then create the tables and indices using the script given above.
2)	Set up the database configuration using either environment variables or in the config.js file in the config folder of the project. For example: Enter something like this in the else part 
```else {
            config.database = {
            hostname: "your hostname",
            database: "db name",
            user: "username",
            password: "password",
            port: 5432
            };
        }
```
3)	Run the project using the following command from the project root folder :
deno run --unstable --allow-net --allow-read --allow-env app.js

**Tests:**
Note: Before executing the tests, in order to run them properly, data from the report table is cleared (included in the test script itself) and new rows are inserted using the tests and then validated against the values inserted.

**Command to run the test from the project root folder:**
deno test --allow-all –unstable

**About using the application:**
Home Page (Landing page):
-	The home page displays a brief description about the application

-	It shows the average mood of all users today and yesterday

-	It displays the trend: if things are looking bright / gloomy today

-	It has options to either “Register” or “Login” on the top right corner of the navigation bar

Register:

-	On clicking register the user will be redirected to the Registration page

-	The user can register by providing a valid email id and setting up a password.

-	The form fields have all required validations

-	On successful registration the user is requested to login.

Login:

•	The user logs in using the registered email and password

•	The fields are validated

•	On successful login the user is redirected to his home page.

•	Once the user logs in, on the top right corner his email id is shown. On clicking that, the logout option is displayed. On logging out the user is redirected to the landing page.

•	Whenever a user tries to access a page without authenticating, he is redirected to the login page.

Reports Home: 

•	This page can also be accessed from the Navigation bar under Reports-> Your report status

•	It shows whether the user has already reported for the day (morning / evening).

•	It also has links that allows the user to “Report morning” or “Report evening” behavior. On clicking the links, 
the user is redirected to the corresponding reporting page.

Report Morning/ Evening:

•	The Navigation bar also has the options of “Report morning” and “Report evening” under Reports menu

•	The user can enter the form and submit it. The fields are validated

•	After successful submission of a report, the same form is shown again so that the user can report for some other day. 

•	If not, the user can choose to go back to the home page using the link given below. He can also navigate to other pages using the navigation bar.

•	If a user submits a report for some day for which he has already reported, the report is “updated”.

Summary:

•	There are options for viewing summary of the user’s activities on the navigation bar. On clicking the Summary menu, the following options are shown:

-	General summary: Average of the reports of last week and last month from the current date

-	Weekly summary: The user can choose to view the summary of his activities for any particular week of the year 

-	Monthly summary: The user can choose to view the summary of his activities for any particular month of the year

APIs:

•	There are 3 APIs accessible at the following paths:

-	/api/summary -Retrieves average of the activities of all users over the last 7 days

-	/api/summary/:year/:month/:day -Retrieves average of the activities of all users for the given day (Ex: /api/summary/2020/12/06 )

-	/api/avgmood -Retrieves average mood of all users yesterday, today and the trend (status: gloomy or bright) 
