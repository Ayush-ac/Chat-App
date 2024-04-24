const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
dotenv.config();
connectDB();

app.use(express.json());

app.get("/", (req,res)=>{
        res.send("API is running");
});

app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)

app.get("/api/chats", (req,res)=>{
    res.send(chats);
});

app.listen(5000, console.log("server started"));