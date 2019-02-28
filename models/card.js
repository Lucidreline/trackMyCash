var mongoose = require("mongoose")

var cardSchema = mongoose.Schema({
    name: String,
    credit: { type: Number, default: 0 },
    owner: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Card", cardSchema);