var passportLocalMongoose = require("passport-local-mongoose"),
    mongoose = require("mongoose"),

    UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    bank: {
        name: { type: String, default: "Bank Name" },
        balance: { type: Number, default: 0 }
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