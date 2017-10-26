module.exports = function (data) {

    this.res.status(404);

    return this.res.json({
        data: data ? data : "Page not found",
        status: false
    });
};
