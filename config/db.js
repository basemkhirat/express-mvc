module.exports = {

    /**
     * The database connection string
     */

    url: 'mongodb://localhost/db_name',

    options: {

        /**
         * This is a mongoose-specific option (not passed to the MongoDB driver) that opts
         * in to mongoose 4.11's new connection logic. If you are writing a new application,
         * you should set this to true.
         */

        useMongoClient: true,

        /**
         * Extra mongodb connection options
         * @url http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html#connect
         */
    }
};
