module.exports = function (data) {

    this.res.status(403);

    return this.res.json({
        data: data ? data : "Forbidden",
        status: false
    });
};
