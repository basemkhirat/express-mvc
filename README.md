# express-mvc
A light-weight full-featured mvc pattern for express framework with minimum dependencies

### The config directory

All application configuration files are stored here grouped by its functionalites:

`app.js` : setting the enviromment, port and main app configurations.

`db.js` : setting monogdb connection parameters.

`body.js` : setting the body parser module configurations.

`i18n.js` : setting the current app locale and other localization configurations.	
 
`jwt.js` : setting the secret hash and expiration date used by bycrpt package.

`session.js` : setting all session configurations such as the name and secret hash.

`csrf.js` : setting the Cross-Site Request Forgery protection.

`cors.js` : setting the Cross-Origin Resource Sharing protection.


In production environment. we always need a different configuration parameters that what the `config/env.js` do.

The application gets the enviroment stored in `app.js` file and load the evironment file. So if we are working in `production` environment, the application will automatically load the configuration file `config/env/production.js` and uses its defined items to override items stored outside.

```javascript
# production.js

module.exports = {
	db: {
		url: 'mongodb://localhost/production_db_name',
	}
}
```

We can access configuration using the `_config` object. so if we want to get the environment we call `_config.app.env`.

### Public directory

Here we can put our static files such as image, css, js, uploads and other client side files.

### Application directory

Contains the MVC folder structure:

`Controllers`: are modules. each module exports object of methods that accepts request and response.

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

`models`: define the mongoose collection models

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

`views`: define app templates files.

The default engine is `ejs`. You can change views setting from `app.js`

```javascript
# hello.ejs

<h1>
    Hello world <%= _lang("name") %>!
</h1>

```


`routes`: define app routes definitions.

There are two files. one for web routes (browser routes) and the other for api routes. you can define routes easily.

```javascript
# web.js

var router = require("express").Router();

router.get("/", HomeController.index);

module.exports = router;
```

`Note` api routes defined in `api.js` are  prefixed by default with the value of configuation `_config.app.api_prefix`;



`middlewares`:are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. The next middleware function is commonly denoted by a variable named next.

```javascript
# SessionAuth.js

module.exports = function (req, res, next) {

    if (req.isAuthenticated()) return next();

    return res.forbidden();
};

You can call middlwares within routes file using:

router.get("/profile", SessionAuth, HomeController.profile);

```


`services`: are stateless libraries of functions (called helpers) that you can use from anywhere in your app. For example, you might have an EmailService which tidily wraps up one or more helper functions so you can use them in more than one place within your application. Services and their helpers are the best and simplest way to build reusable code.


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

# From anywhre you can call it/

EmailService.send()

```

`lang`: stores the translation keys grouped by each locale.

`responses`: are custom responses attached to the `res` object to send a given responses. you can write your own custom response.


```javascript
#invalid.js

module.exports = function (data) {
	
	var req = this.req; 
	var res = this.res;
	
	// data processing......
	
	return res.send(data);    
});
```

From controller or middlewares you can call it using `res.invalid()`


## Author
[Basem Khirat](http://basemkhirat.com) - [basemkhirat@gmail.com](mailto:basemkhirat@gmail.com) - [@basemkhirat](https://twitter.com/basemkhirat)  


## Bugs, Suggestions and Contributions

Thanks to [everyone](https://github.com/basemkhirat/express-mvc/graphs/contributors)
who has contributed to this project!

Please use [Github](https://github.com/basemkhirat/express-mvc) for reporting bugs, 
and making comments or suggestions.

## License

MIT




