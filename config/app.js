module.exports = {

    /**
     * The runtime "environment" of your app is either typically
     * 'development' or 'production'.
     */

    env: process.env.NODE_ENV || 'development',

    /**
     * The application base url
     */

    url: 'http://localhost',

    /**
     * The `port` setting determines which TCP port your app will be deployed on.
     */

    port: process.env.PORT || 3000,

    /**
     * The x-powered-by header key
     */

    x_powered_by: 'express',

    /**
     * View engine to use for your app's server-side views
     */

    view_engine: "ejs",

    /**
     * The views directory path
     */

    views: require('path').join(__basepath, 'app/views'),


    /**
     * The api url prefix
     */

    api_prefix: "api"
};

