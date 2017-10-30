module.exports = {

    /****************************************************************************
     *                                                                           *
     * Expose each of your app's models as global variables (using their         *
     * "globalId"). E.g. a model defined in app/controllers/HomeController.js    *
     * would have a globalId of HomeController by default. If this is disabled,  *
     * you can still access your models via app.controllers.*.                   *
     *                                                                           *
     ****************************************************************************/

    controllers: true,

    /****************************************************************************
     *                                                                           *
     * Expose each of your app's models as global variables (using their         *
     * "globalId"). E.g. a model defined in app/models/User.js would have a      *
     * globalId of User by default. If this is disabled, you can still access    *
     * your models via app.models.*.                                             *
     *                                                                           *
     ****************************************************************************/

    models: true,

    /****************************************************************************
     *                                                                           *
     * Expose each of your app's models as global variables (using their         *
     * "globalId"). E.g. a model defined in app/middlewares/Auth.js would        *
     * have a globalId of Auth by default. If this is disabled,                  *
     * you can still access your models via app.middlewares.*.                   *
     *                                                                           *
     ****************************************************************************/

    middlewares: true,

    /****************************************************************************
     *                                                                           *
     * Expose each of your app's services as global variables (using their       *
     * "globalId"). E.g. a service defined in app/services/Auth.js               *
     * would have a globalId of Auth by default. If this is disabled,            *
     * you can still access your services via app.services.*.                    *
     *                                                                           *
     ****************************************************************************/

    services: true
};
