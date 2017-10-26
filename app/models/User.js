module.exports = function (mongoose) {

    var schema = mongoose.Schema({
            username: {
                type: String,
                unique: true
            },
            email: {
                type: String,
                required: true,
                unique: true
            },
            password: {
                type: String
            },
            first_name: {
                type: String,
                required: true
            },
            score: {
                type: Number,
                default: 0
            },
            lang: {
                type: String,
                default: 'en'
            },
            created_at: {
                type: Date,
                default: Date.now
            },
            updated_at: {
                type: Date,
                default: Date.now
            }

        }, {
            versionKey: false
        }
    );

    return mongoose.model("user", schema, "user");
};
