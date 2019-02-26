var passportLocalMongoose = require("passport-local-mongoose"),
    mongoose = require("mongoose"),

    UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    bank: {
        name: String,
        balance: Number
    },
    cards : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);