const mongoose = require("mongoose");

// const User = new mongoose.Schema({
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Users"
// })


const ConversationSchema = new mongoose.Schema(
    {
        members: {
            type: Array,
        }        
    },
    { timestamps: true}
);

module.exports = mongoose.model("Conversation", ConversationSchema);