/**
 * Csrf protection
 * @usage <input type="hidden" name="_csrf" value="<%= req.csrfToken() %>">
 * @type {{cookie: boolean, ignoreMethods: [string,string,string], sessionKey: string}}
 */

module.exports = {

    /**
     * Determines if the token secret for the user should be stored in a cookie
     * or in req.session. Defaults to false
     */
    cookie: false,

    /**
     * An array of the methods for which CSRF token checking will disabled.
     * Defaults to ['GET', 'HEAD', 'OPTIONS']
     */

    ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],

    /**
     * Determines what property ("key") on req the session object is located.
     * Defaults to 'session' (i.e. looks at req.session).
     * The CSRF secret from this library is stored and read as req[sessionKey].csrfSecret.
     * If the "cookie" option is not false, then this option does nothing.
     */

    sessionKey: 'session'
};
