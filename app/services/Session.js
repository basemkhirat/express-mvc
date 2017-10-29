function Session() {

}

Session.prototype.store = function (user, callback) {

    console.log("storing user into session");
    //console.log(app.req);

    req.session.current_user = JSON.stringify(user);

        callback(null, user);
};

Session.prototype.login = function (payload, callback) {

};

Session.prototype.user = function () {
    return this.user;
};

Session.prototype.check = function () {
    return !!this.user;
};


module.exports = new Session();
