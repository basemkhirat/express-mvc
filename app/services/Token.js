/**
 * Token Service
 *
 * @description :: JSON Web token Service
 * @help        :: See https://github.com/auth0/node-json web token
 */

const jwt = require('jsonwebtoken');

module.exports = {

    user: false,

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

    login: function (payload, callback) {

    },

    user: function () {
        return this.user;
    },

    check: function () {
        return !!this.user;
    }
};

