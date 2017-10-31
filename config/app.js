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
     * Enabling trust proxy will have the following impact:
     * The value of req.hostname is derived from the value set in the X-Forwarded-Host header, which can be set by the client or by the proxy.
     * X-Forwarded-Proto can be set by the reverse proxy to tell the app whether it is https or http or even an invalid name. This value is reflected by req.protocol.
     * The req.ip and req.ips values are populated with the list of addresses from X-Forwarded-For.
     */

    trust_proxy: true,

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

