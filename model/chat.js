const mongoose = require('mongoose');
const {Schema} = mongoose;


const chatSchema = new Schema({
    from: {
        type:String,
        required:true
    },
    to: {
        type:String,
        required:true
    },
    message: {
        type:String,
        maxLength:100
    },
    created_at: {
        type:Date,
        required:true
    },                          
});

const Chat = mongoose.model("Chat", chatSchema);


module.exports = Chat