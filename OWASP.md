## B04 - OWASP

1. SQL Injection

In an SQL injection attack, the attacker manipulates the application's input fields to inject malicious SQL code into the database query. If the application does not properly validate or sanitize user input and directly includes it in the SQL query, the injected code will be executed by the database, leading to unauthorized access or unintended actions.

Here's an example of a vulnerable SQL query:
``` sql
SELECT * FROM users WHERE username = 'admin' AND password='password123'
```
In this query, the application is checking the 'username' and 'password' fields for login purposes.

An attacker can perform a SQL injection by inputting the following into the username field:
``` sql
admin' OR '1'='1
```

The SQL injection manipulates the query to the following:
``` sql
SELECT * FROM users WHERE username = 'admin' OR '1'='1' AND password='password123'
```
By typing ```admin' OR '1'='1``` in the username field and with a random password, the user will log in successfully.

OR
``` sql
' or 1=1--
```
This query returns the first user in the database as validation for the username field, because 1 does in fact equal 1, while ignoring the request for a password due to the comment at the end.

2. HTML dan CSS Injection

HTML Injection exploits website vulnerabilities due to a lack of validation of user input. In this attack, HTML code is used as input or certain parameters. Due to the lack of input validation and sanitation, this HTML code is considered valid input and has the possibility of being displayed as an HTML component by the attacked website. HTML components that should not be present can be used by attackers to obtain the credentials of genuine users who trust the website.

3. File Upload Vulnerabilities



4. 
