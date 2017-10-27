/**
 * Token Service
 *
 * @description :: JSON Web token Service
 * @help        :: See https://github.com/auth0/node-json web token
 */

const jwt = require('jsonwebtoken');

module.exports = {

    currentUser: null,

    /**
     * generate a new token
     * @param payload
     * @returns {*}
     */
    generate: function (payload) {
        return jwt.sign(
            payload,
            _config.jwt.secret,
            {
                expiresIn: _config.jwt.expires
            }
        );
    },

    /**
     * check token is valid
     * @param token
     * @param callback
     * @returns {*}
     */
    verify: function (token, callback) {
        return jwt.verify(
            token,
            _config.jwt.secret,
            {},
            callback
        )
    },

    /**
     * get decoded date from token
     * @param token
     * @returns {*}
     */
    decode: function (token) {
        return jwt.decode(token);
    },

    /**
     * set current user
     * @param user
     */
    setUser: function (user) {
        this.currentUser = user;
    },

    /**
     * get logged user
     * @param field
     * @returns {null}
     */
    user: function (field) {
        return field != null ? this.currentUser[field] : this.currentUser;
    },

    /**
     * check if there is logged user
     * @returns {boolean}
     */
    check: function () {
        return !!this.currentUser;
    }

};

