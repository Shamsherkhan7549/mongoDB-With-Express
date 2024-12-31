const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./model/chat.js');
const methodOverride = require('method-override')
const ExpressError = require('./ExpressError')

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


function wrapAsync(fn){
    return function (req, res, next){
        fn(req, res, next).catch(err=>next(err))
    }
}

app.get('/', (req, res,next)=>{
    res.send("Hi, I am root");
});

app.get('/home', wrapAsync(async (req, res,next)=>{
    let chats = await Chat.find();
    res.render('index.ejs',{chats});
})); 

// creation of chat
app.get('/home/new', wrapAsync((req, res,next)=>{
    res.render('new.ejs');
  }));

app.post('/home', wrapAsync(async(req, res, next)=>{
    const created_at =  new Date();
    const{from,to, message,} = req.body;
    // if(!from){
    //     next(new ExpressError(402, 'Sender name required!'))
    // }else if(!to){
    //     next(new ExpressError(402, 'Reciever name required!'))

    // }else if(!message){
    //     next(new ExpressError(402, 'Chat required!'))
    // }
    const newChat = await new Chat({from, to, message, created_at}).save();
    res.redirect('/home')
}));

//Delete function
app.delete('/home/:id', wrapAsync(async(req, res, next)=>{ 
    const {id} = req.params;
    const deletedChat = await Chat.findByIdAndDelete(id);
    res.redirect('/home');
}));

//Update function
app.get("/home/:id/update", wrapAsync(async (req, res, next)=>{
    const {id} = req.params;
    const data = await Chat.findById(id);

    if(!data){
        next( new ExpressError(404,'chat not found')); 
    }
    res.render('update.ejs',{data});
}));

app.patch("/home/:id", wrapAsync(async(req, res, next)=>{
    const {id} = req.params;
    const{message} = req.body;
    if(!message){
        next(new ExpressError(402, 'message required'))
    }
    await Chat.findByIdAndUpdate(id, {message:message});
    res.redirect('/home');
}));

const handleError = (err) =>{
    console.log("this is validation error all input required please enter");
    console.log(err.message)
    return err
};

app.use((err, req, res, next)=>{
    console.log(err.name)
    if(err.name === 'ValidationError'){
        handleError(err)
    }
   next(err)
})

app.use((err, req, res, next) => {
    const{status = 500, message = 'Internal server error'} = err;
    console.log(status, message);
    res.status(status).send(message);
})

app.listen(8080,(req, res)=>{
    console.log("server is running on port 8080.")
});
