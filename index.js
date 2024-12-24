const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./model/chat.js');
var methodOverride = require('method-override')

const app = express();

app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

main()
.then(()=>{
    console.log("mongoose connection successful.")
})
.catch(err=>{
    console.log("error found in server(mongoose).")
});

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/instagram');
};


app.get('/', (req, res)=>{
    res.send("Hi, I am root");
});

app.get('/home', async (req, res)=>{
    let chats = await Chat.find();
    res.render('index.ejs',{chats});
});

// creation of chat

app.get('/home/new', async (req, res)=>{ 
    res.render('new.ejs');
});

app.post('/home', async(req, res)=>{
    const created_at =  new Date();
    const{from,to, message,} = req.body;
    const newChat = await new Chat({from, to, message, created_at}).save();
    res.redirect('/home')
});

//Delete function
app.delete('/home/:id', async(req, res)=>{ 
    const {id} = req.params;
    // const data = await Chat.findOne({_id:id})
    // const deletedChat = await Chat.deleteOne({_id:id});
    // console.log(deletedChat);
    const deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect('/home');
});

//Update function
app.get("/home/:id/update", async (req,res)=>{
    const {id} = req.params;
    const data = await Chat.findById(id)
    res.render('update.ejs',{data});
});

app.patch("/home/:id",async(req,res)=>{
    const {id} = req.params;
    const{message} = req.body;
    await Chat.findByIdAndUpdate(id, {message:message});
    res.redirect('/home');
})

app.listen(8080,(req, res)=>{
    console.log("server is running on port 8080.")
});
