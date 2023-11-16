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

<div align="center">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/sqlInjection1.png">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/sqlInjection2.png">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/sqlInjection4.png">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/sqlInjection3.png">
</div>

</br>

2. HTML and CSS Injection

HTML Injection exploits website vulnerabilities due to a lack of validation of user input. In this attack, HTML code is used as input or certain parameters. Due to the lack of input validation and sanitation, this HTML code is considered valid input and has the possibility of being displayed as an HTML component by the attacked website. HTML components that should not be present can be used by attackers to obtain the credentials of genuine users who trust the website.

<b>How to prevent it?</b> </br> Sanitize every input from the user, while React uses a technique called "JSX" (JavaScript XML) to render components, which inherently helps prevent direct HTML injection. JSX allows developers to write HTML-like syntax in JavaScript, but it gets transpiled to regular JavaScript before being executed in the browser. During this process, React automatically escapes any user-generated content that gets inserted into the DOM. This behavior helps to mitigate the risk of HTML injection vulnerabilities.

Here's an example for sanitizing user input:

https://github.com/bangkitdc/podcastify-premium/assets/87227379/98929106-a05d-4d6b-87e8-51eb21ab0026

Here's an example in React (automatically):
<div align="center">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/htmlinjection.png">
</div>

It will make sure to not render HTML or script tags, this will prevent HTML and CSS injection attacks.

3. File Upload Vulnerabilities

File upload vulnerability is a condition when a website or server allows users to upload files without validating several attributes, such as name, type, content, and size. This causes users to upload files that are dangerous or have a very large size. In fact, the file can be a server-side script file that allows remote code execution. For example, we upload a file with .mp3.php (malicious).

https://github.com/bangkitdc/podcastify-premium/assets/87227379/e7ecfd61-5cb0-430e-adb9-a43780951f71

You have to validate every input from the user, especially the file. For example, we can define a maximum file size or file type that the user can upload to our server.

4. Parameter Pollution

Parameter pollution allows attackers to bypass query parameter input validation from a request to the server by exploiting query parameters with the same name. This can happen because an application may concatenate all input parameters with the same name but the validation process only checks the parameter values one by one before concatenation. This can then be used to do various things that should not be allowed on the server, such as performing SQL injection.

To handle that, we need to validate not only the parameter but also the query that is being sent to the server. We need to define what type of query the server expected and then don't forget to sanitize the query also.

<div align="center">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/parameterpollution.png">
</div>

5. JWT Attack

JWT attacks generally involve users modifying the JWT token and using it to call the server API. Modifications are aimed at several things, such as bypassing user authentication and authorization, pretending to be another user, or making the user an admin. This attack can occur if the server does not verify the JWT token correctly or the secret used to create the signature is leaked to the user.

In our application, we implement a secure authentication method known as JWT (JSON Web Token) authentication paired with a refresh token mechanism. When a user logs in, they receive two tokens:

1. Access Token </br>
The access token is utilized for data requests and is embedded in the request header. It has a short lifespan of 15 minutes, enhancing security as it automatically refreshes upon expiration. Access to this token is restricted from attackers. Users obtain this token during their initial login or when they request a new access token.

2. Refresh Token </br>
The refresh token is stored in a cookie. Its primary function is to maintain user authentication for a prolonged period, typically 7 days unless the user logs out. The refresh token resides in the cache and acts as a means for users to remain authenticated without needing to log in again, even if the access token expires. It is configured as an HTTP-only cookie with specific path settings, ensuring that only the server can access and utilize it to refresh the user's token.

The secret key is used to create the signature for the JWT. When a JWT is created (signed), the payload is encoded, and a cryptographic signature is generated based on the combination of the header, payload, and secret key. This signature is then appended to the token.

The importance of the secret key lies in its role in verifying the authenticity of the JWT. When a client sends a JWT to the server for authentication or access to protected resources, the server needs to validate the JWT's signature to ensure that the token hasn't been tampered with and that it was indeed generated by a trusted source (the server).

<div align="center">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/jwt.png">
  <img width="400" alt="image" src="https://github.com/bangkitdc/podcastify-premium/blob/main/readme/jwt2.png">
</div>
