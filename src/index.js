const express=require('express')
const bodyParser=require('body-parser')

const{PORT}=require("./config/serverConfig")
const ApiRoute=require("./routes/index")
const { createChannel } = require('./utils/message-queue');
const db=require('./models/index')

const setupAndStartServer=async()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));
    app.use('/api',ApiRoute);
    await createChannel();
    app.listen(PORT,async()=>{
        console.log(`server is running at ${PORT}`);
        
    })
}

setupAndStartServer();