module.exports = function (data) {

    this.res.status(500);

    if(data === undefined || _config.app.env == 'production'){
        data = "Internal Server Error";
    }

    return this.res.json({
        data: data,
        status: false
    });
};
