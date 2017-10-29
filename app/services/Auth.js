function Auth(driver) {
    this.driver = driver;
}

Auth.prototype.login = function (payload, callback) {
    this.driver.login(payload, callback);
};

Auth.prototype.user = function () {
    this.driver.user()
};

Auth.prototype.check = function () {
    return !!this.driver.user;
};

Auth.prototype.attempt = function (username, password, callback) {


    var driver = this.driver;

    User.findOne({username: username}, function (error, user) {

        if (error) return callback(error);
        if (!user) return callback('Username not foundْ');

        user.comparePassword(password.toString(), user.password, function (error, valid) {

            if (error) {
                return callback(error);
            }

            if (!valid) {
                return callback('Invalid username or password');
            } else {

                return driver.store(user, callback);

                /*return callback(null,
                    user
                    //token: Token.generateToken({id: user.id}),
                    //expires: new Date().getTime() + 3 * 60 * 60
                );*/
            }

        });
    });
};


module.exports = new Auth(require("./Session"));
