const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');
const Razorpay = require("razorpay");
require("dotenv").config();
const path = require("path");

const app = express();

// CORS configuration

app.use(cors({
    origin: process.env.FRONTEND_URL,   // Frontend URL from .env file
    credentials: true,                  // Allow credentials (cookies, etc.)
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],  // Allowed methods as an array
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'] // Allowed headers as an array
}));

// Allow preflight (OPTIONS) requests for CORS
app.options('*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));

app.use("/api", router);

//resolving dirname for ES module
console.log("File path:", __filename); 
console.log("Directory name:", __dirname); 

//use the client app
app.use(express.static(path.join(__dirname,'/client/build')))

//render client for any path


const PORT = process.env.PORT || 8080;
app.get('*',(req,res)=>res.sendFile(path.join(__dirname,'/client/build/index.html')))

//razorpay 
app.post("/order",async (req,res)=>{
   const razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_SECRET,
   });

   const options =req.body;
   const order =await razorpay.orders.create(options);

   if(!order){
       return res.status(500).send("error")
   }
   res.json(order);
})

// Connect to database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Connected to DB");
        console.log("Server is running on PORT " + PORT);
    });
});
