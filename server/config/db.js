const mongoose = require("mongoose")


async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://anushasurendran333:04931224467@cluster0.bg98p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    }catch(err){
        console.log(err)
    }
}

module.exports = connectDB

