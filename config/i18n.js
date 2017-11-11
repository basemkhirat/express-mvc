module.exports = {

    /**
     * you may alter a site wide default locale
     */

    defaultLocale: 'en',

    /**
     * setup some locales - other locales default to en silently
     */

    locales: ['en', 'ar'],

    /**
     * fall back from ar to en
     */

    fallbacks: {
        'ar': 'en'
    },

    /**
     * where to store json files - defaults to './locales' relative to modules directory
     */

    directory: __basepath + '/app/lang',

    /**
     * sets a custom cookie name to parse locale settings from  - defaults to NULL
     */

    cookie: 'lang',

    /**
     * query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
     */

    queryParameter: 'lang',

    /**
     * control mode on directory creation - defaults to NULL which defaults to umask of process user. Setting has no effect on win.
     */

    directoryPermissions: '755',

    /**
     * watch for changes in json files to reload locale on updates - defaults to false
     */

    autoReload: true,

    /**
     * whether to write new locale information to disk - defaults to true
     */

    updateFiles: false,

    /**
     * sync locale information across all files - defaults to false
     */

    syncFiles: false,

    /**
     * what to use as the indentation unit - defaults to "\t"
     */

    indent: "\t",

    /**
     * setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
     */

    extension: '.json',

    /**
     * setting prefix of json files name - default to none '' (in case you use different locale files naming scheme (webapp-en.json), rather then just en.json)
     */

    prefix: '',

    /**
     * enable object notation
     */

    objectNotation: false,

    /**
     * setting of log level DEBUG - default to require('debug')('i18n:debug')
     * @param msg
     */

    logDebugFn: function (msg) {
        // console.log('debug', msg);
    },

    /**
     * setting of log level WARN - default to require('debug')('i18n:warn')
     * @param msg
     */

    logWarnFn: function (msg) {
        // console.log('warn', msg);
    },

    /**
     * setting of log level ERROR - default to require('debug')('i18n:error')
     * @param msg
     */

    logErrorFn: function (msg) {
        // console.log('error', msg);
    },

    /**
     * object or [obj1, obj2] to bind the i18n api and current locale to - defaults to null
     */
    register: global,

    /**
     * Downcase locale when passed on queryParam; e.g. lang=en-US becomes
     * en-us.  When set to false, the queryParam value will be used as passed
     * e.g. lang=en-US remains en-US.
     */

    preserveLegacyCase: true
};
