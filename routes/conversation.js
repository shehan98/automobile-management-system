const router = require("express").Router();
const Conversation = require("../models/ConversationModel")

//const Users = require('../models/userModel')

//new conversation

router.post("/", async (req, res) => {

    //const sender = await Users.findById(req.user.id).select('firstName email')
    //const {_id} = sender


    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        res.status(500).json(err)
    }
});

//get coversation of a user

router.get("/:userId", async (req, res)=>{
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]}
        });
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;