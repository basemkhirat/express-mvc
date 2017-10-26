module.exports = function (data) {

    this.res.status(400);

    return this.res.json({
        data: data ? data : "Bad Request",
        status: false
    });
};
