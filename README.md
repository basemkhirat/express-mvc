# Attention

Now, we don't give support for this package as we worked on the core since Jan 2019 to introduce dotapp nodejs framework.

See: [DotApp Framework](https://github.com/basemkhirat/dotapp-framework)

If you are a maintainer, contact us and you are welcome to have access.

# express-mvc
A light-weight mvc pattern for express framework with minimum dependencies


## Installation

```bash
npm install express-mvc-generate -g
```

Express MVC generator command will be installed globally so from anywhere you can call it to generate the project skeleton.

```bash
express-mvc-generate my-project
cd my-project
npm install
npm start
```
Server will be created at port 3000 by default. you can change the port later from app configurations.

Browse `http://localhost:3000` and have fun.


## The config directory

All application configuration files are stored here grouped by its functionalites:

`app.js` setting the enviromment, port and main app configurations.

`db.js` setting monogdb connection parameters.

`body.js` setting the body parser module configurations.

`i18n.js` setting the current app locale and other localization configurations.	
 
`jwt.js` setting the secret hash and expiration date used by bycrpt package.

`session.js` setting all session configurations such as the name and secret hash.

`csrf.js` setting the Cross-Site Request Forgery protection.

`cors.js` setting the Cross-Origin Resource Sharing protection.


In production environment. we always need a different configuration parameters that what the `config/env` directory do.

The application gets the enviroment stored in `app.js` file and load the evironment file. So if we are working in `production` environment, the application will automatically load the configuration file `config/env/production.js` and uses its defined items to override items stored outside.

```javascript
# production.js

module.exports = {
	db: {
		url: 'mongodb://localhost/production_db_name',
	}
}
```

We can access configuration using the `_config()` function. so if we want to get the environment key we call `_config('app.env')`.

## Public directory

Here we can put our static files such as image, css, js, uploads and other client side files to be served.

## Application directory

Contains the MVC folder structure:

`controllers` are modules. each of them exports an object of methods that accept request and response.

```javascript
# HomeController.js

module.exports = {

    /**
     * Show homepage
     * @param req
     * @param res
     */
    index: function (req, res) {
        return res.render("hello world !");
    },
}
```

`routes` define app routes definitions.

There are two files. one for web routes (browser routes) and the other for api routes. you can define routes easily.

```javascript
# web.js

var router = require("express").Router();

router.get("/", HomeController.index);

module.exports = router;
```

`Note` api routes defined in `api.js` are prefixed by default with the value of configuation `_config("app.api_prefix")`;

`models` define the mongoose collection models that interact directly with database.

```javascript
# User.js

var mongoose = require("mongoose");

var schema = mongoose.Schema({
        username: {
            type: String,
            unique: true
        }     
});

module.exports = mongoose.model("user", schema, "user");
```

You should read [mongoose docs](http://mongoosejs.com/docs/guide.html) before writing your models

`views` define app templates files.

The default engine is `ejs`. You can change views settings from `app.js`

```javascript
# hello.ejs

<h1>
    Hello world <%= _lang("name") %>!
</h1>

```

`middlewares` are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

```javascript
# SessionAuth.js

module.exports = function (req, res, next) {

    if (req.isAuthenticated()) return next();

    return res.forbidden();
};

You can call middlwares within routes file using:

router.get("/profile", SessionAuth, HomeController.profile);

```


`services` are libraries of functions that you can use from anywhere in your app. For example, you might have an EmailService which tidily wraps up one or more helper functions so you can use them in more than one place within your application. Services are the best and simplest way to build reusable code.


```javascript
# EmailService.js

module.exports = {

    /**
     * Send emails
     * @param req
     * @param res
     */
    send: function (req, res) {
        // Sending ...
    },
}
```

From anywhere in your project you can call it `EmailService.send()`

`lang` stores the translation keys grouped by each locale.

```javascript
# en.json

{
	"name": "express"
}
```

You can get the localized value using the helper function `_lang('name')`


`responses`: are custom responses attached to the `res` object to send a given responses. you can write your own custom response.


```javascript
# invalid.js

module.exports = function (data) {
	
	var req = this.req; 
	var res = this.res;
	
	// data processing......
	
	return res.send(data);    
});
```

From controller or middlewares you can call it using `res.invalid()`



## Global helper functions


`_config(key)` gets the configuration value by key.

```javascript
_config("app.env");		
// return 'development'

_config("db"); 	
// return { url: 'mongodb://localhost/db_name', options: { useMongoClient: true } }

```

`_lang(key)` gets the localized value by key.

```javascript
_lang("name");		
// return 'express'
```


`_url(path)` gets the application base url.

```javascript
_url();		
// return 'http://localhost:3000'

_url("api/token");		
// return 'http://localhost:3000/api/token'

_url("css/style.css");		
// return 'http://localhost:3000/css/style.css'

```


## Authentication

This application comes with two type of authentication methods:

`session` for working with server side rendering applications which authentication meta data is stored as session files on server and cookies in browser and browser sends this cookie with any request.

You can set the session using `login` function

```javascript
req.login({id: "59f4856fd3b99e1d311ef94a", name: 'john'}, function (error) {
    if (error) return next(error);
    return res.redirect("/profile");
});
```
Also you can use the builtin SesionAuth middleware to protect your routes.

```javascript
router.get("/profile", SessionAuth, HomeController.profile);
```

To logout please use the `logout` function

```javascript
req.logout();
```

---
`jwt` authentication suitable for building APIs.

In this type we only generate a json web token for the user payload object
using the `sign` function

```javascript
jwt.sign(
    user.toJSON(),
    _config("jwt.secret"),
    {expiresIn: _config("jwt.expires")}
);

// return '.eyJ1cGRhdGVkQXQiOiIyMDE3LTEwLTMwVDE3OjQxOjQzLjExOFoiLCJjcmVhdGVkQXQiOiIyMDE3LTEwLTMwVDE3OjQxOjQzLjExOFoiLCJlbWFpbCI6ImF0ZWZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkUlJZb3Z5YlFZSGx0NFRZOWNXSzhZLjd0QlozN1ZNU0p1SXZkYmNZSGVoVFRwcjlOczFEMUMiLCJmaXJzdF9uYW1lIjoic2RmIiwiX2lkIjoiNTlmNzY0NTdjNzU2MmM1ODkxYjkzNmYxIiwidXBkYXRlZF9hdCI6IjIwMTctMTAtMzBUMTc6NDE6NDMuMTE4WiIsImNyZWF0ZWRfYXQiOiIyMDE3LTEwLTMwVDE3OjQxOjQzLjExOFoiLCJsYW5nIjoiZW4iLCJzY29yZSI6MCwiaWF0IjoxNTA5Mzg1MzAzLCJleHAiOjE2MDkzODUzMDJ9.JCYlwK66EbHXsGeZw12MXC5RhUbiJIG_G3xV-2Qyvws'
```

This token will be sent to the client (browser or mobile) and the client will store and send it every request using the query string parameter `?token=thehashhere`

You can use the built-in TokenAuth middleware to protect your routes

```javascript
router.get("/user", TokenAuth, UserController.find);
```

---
You can check if user is logged in using:

```javascript
req.isAuthenticated();		// return true or false
```

You can get the current user

```javascript
req.user;		// return a json of user object
```

## Redirection

The response method `res.back()` is added with express to redirect to the previous page.

## Author
[Basem Khirat](http://basemkhirat.com) - [basemkhirat@gmail.com](mailto:basemkhirat@gmail.com) - [@basemkhirat](https://twitter.com/basemkhirat)  


## Bugs, Suggestions and Contributions

Thanks to [everyone](https://github.com/basemkhirat/express-mvc/graphs/contributors)
who has contributed to this project!

Please use [Github](https://github.com/basemkhirat/express-mvc) for reporting bugs, 
and making comments or suggestions.

## License

MIT




