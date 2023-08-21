const express = require("express")
const app = express()
require("dotenv").config() 
const mongoose = require("mongoose")
const routers = require("./Routers/Login")
app.use(express.json())
const cors = require("cors")
// app.use(cors())
const cookieParser = require("cookie-parser")
app.use(cookieParser())
// app.use
app.use(cors({
    origin:["http://localhost:3000","*"],
    credentials:true
}))

app.use("/api/auth",routers)


mongoose.connect(process.env.MONGO_URI)
.then( (succ) =>{
    app.listen(process.env.PORT, () =>{
        console.log("App is Running and mongo db is connent")
    })
}).catch((err) =>{
    console.log(err)
})


