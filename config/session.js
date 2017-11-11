module.exports = {

    /**
     * The name of the session ID cookie to set in the response (and read from in the request).
     */

    name: "express",

    /**
     * This is the secret used to sign the session ID cookie.
     * This can be either a string for a single secret, or an array of multiple secrets.
     * If an array of secrets is provided, only the first element will be used to sign the session ID cookie,
     * while all the elements will be considered when verifying the signature in requests.
     */

    secret: "^@O#(*&TG&RY@U)(#*(*#**&#(*@TEU@&",

    /**
     * Forces the session to be saved back to the session store,
     * even if the session was never modified during the request. Depending on your store this may be necessary,
     * but it can also create race conditions where a client makes two parallel requests
     * to your server and changes made to the session in one request may get overwritten when the other request ends,
     * even if it made no changes (this behavior also depends on what store you're using).
     * The default value is true, but using the default has been deprecated, as the default will change in the future.
     * Please research into this setting and choose what is appropriate to your use-case.
     * Typically, you'll want false.
     * How do I know if this is necessary for my store? The best way to know is to check with your store
     * if it implements the touch method. If it does, then you can safely set resave: false.
     * If it does not implement the touch method and your store sets an expiration date on stored sessions,
     * then you likely need resave: true.
     */

    resave: true,

    /**
     * Forces a session that is "uninitialized" to be saved to the store.
     * A session is uninitialized when it is new but not modified.
     * Choosing false is useful for implementing login sessions,
     * reducing server storage usage, or complying with laws that require permission before setting a cookie.
     * Choosing false will also help with race conditions where
     * a client makes multiple parallel requests without a session.
     * The default value is true, but using the default has been deprecated, as the default will change in the future.
     * Please research into this setting and choose what is appropriate to your use-case.
     * Note if you are using Session in conjunction with PassportJS, Passport will add an empty Passport object
     * to the session for use after a user is authenticated, which will be treated as a modification to the session,
     * causing it to be saved. This has been fixed in PassportJS 0.3.0
     */

    saveUninitialized: true,

    /**
     * Settings object for the session ID cookie.
     * The default value is { path: '/', httpOnly: true, secure: false, maxAge: null }.
     */

    cookie: {

        /**
         * Specifies the value for the Path Set-Cookie. By default, this is set to '/',
         * which is the root path of the domain.
         */

        path: '/',

        /**
         * Specifies the boolean value for the HttpOnly Set-Cookie attribute.
         * When truthy, the HttpOnly attribute is set, otherwise it is not.
         * By default, the HttpOnly attribute is set.
         * Note be careful when setting this to true, as compliant clients will not allow
         * client-side JavaScript to see the cookie in document.cookie.
         */

        httpOnly: true,

        /**
         * Specifies the boolean value for the Secure Set-Cookie attribute.
         * When truthy, the Secure attribute is set, otherwise it is not.
         * By default, the Secure attribute is not set.
         * Note be careful when setting this to true, as compliant clients will not send
         * the cookie back to the server in the future if the browser does not have an HTTPS connection.
         */

        secure: false,

        /**
         * Specifies the number (in milliseconds) to use when calculating the Expires Set-Cookie attribute.
         * This is done by taking the current server time and adding maxAge milliseconds
         * to the value to calculate an Expires datetime. By default, no maximum age is set.
         * Note If both expires and maxAge are set in the options, then the last one defined in the object is what is used.
         * By default cookie.maxAge is null, meaning no "expires" parameter is set so the cookie becomes
         * a browser-session cookie. When the user closes the browser the cookie (and session) will be removed.
         */

        maxAge: null,

        /**
         * Specifies the Date object to be the value for the Expires Set-Cookie attribute.
         * By default, no expiration is set, and most clients will consider this a "non-persistent cookie"
         * and will delete it on a condition like exiting a web browser application.
         */

        // expires: Date


        /**
         * Specifies the value for the Domain Set-Cookie attribute.
         * By default, no domain is set, and most clients will consider the cookie to apply to only the current domain.
         */

        // domain: "example.com"
    }
};
