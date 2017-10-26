module.exports = function (data) {

    this.res.status(200);

    return this.res.json({
        data: data ? data : {},
        status: true
    });
};
