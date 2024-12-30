const mongoose = require('mongoose');
const Chat = require('./model/chat.js');

main()
.then(()=>{
    console.log("mongoose connection successful.")
})
.catch(err=>{
    console.log("error found in server(mongoose)")
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/instagram');
};

let chats = [
    {
        from:"hema",
        to:"dharmendra",
        message:"where  are you dear?",
        created_at: new Date()   
    },
    {
        from:"sameer",
        to:"samar",
        message:"dont make fun of it",
        created_at: new Date()   
    },
    {
        from:"gulfam",
        to:"gufran",
        message:"focus on studies",
        created_at: new Date()   
    },
    {
        from:"chand",
        to:"tara",
        message:"please come for pary",
        created_at: new Date()   
    },
    {
        from:"tony",
        to:"peter",
        message:"Why you did this?",
        created_at: new Date()   
    },
]

Chat.insertMany(chats);