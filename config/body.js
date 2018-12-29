module.exports = {

    /**
     * The extended option allows to choose between parsing the URL-encoded data with the querystring library
     * (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays
     * to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
     */

    extended: false,

    /**
     * When set to true, then deflated (compressed) bodies will be inflated;
     * when false, deflated bodies are rejected. Defaults to true.
     */

    inflate: true,

    /**
     * Controls the maximum request body size. If this is a number, then the value specifies the number of bytes;
     * if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
     */

    limit: '20480kb',

    /**
     * The parameterLimit option controls the maximum number of parameters that are allowed in the URL-encoded data.
     * If a request contains more parameters than this value, a 413 will be returned to the client. Defaults to 1000.
     */

    parameterLimit: 1000,

    /**
     * The type option is used to determine what media type the middleware will parse.
     * This option can be a string, array of strings, or a function.
     * If not a function, type option is passed directly to the type-is library
     * and this can be an extension name (like urlencoded), a mime type (like application/x-www-form-urlencoded),
     * or a mime type with a wildcard (like x-www-form-urlencoded).
     * If a function, the type option is called as fn(req) and the request is parsed if it returns a truthy value.
     * Defaults to application/x-www-form-urlencoded.
     */

    type: 'application/x-www-form-urlencoded'
}
