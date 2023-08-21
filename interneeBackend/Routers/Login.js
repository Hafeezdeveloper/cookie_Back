const express = require("express")
const { sendResponse } = require("../Helper/Helper")
const routers = express.Router()
const bcrypt = require('bcrypt');
const userModel = require("../Models/UserSchema");
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const { config } = require("dotenv");
var jwt = require('jsonwebtoken');
const Authent = require("../Contollers/Authent");

routers.get('/getUser' , async (req,res) =>{
    try{
let result = await userModel.find()
        if(!result){

            res.send(sendResponse(false,result,"result Not Found","error")).status(500)
        }else{
            res.send(sendResponse(false,result,"result Found","sucess")).status(200)
        }
    }catch(e){
        console.log(e)
    }
})  

routers.post('/signUp' ,Authent.signUp)  

routers.post('/login' , Authent.login)  


routers.get( "/protect" ,Authent.protect)  

routers.use(  function (req,res,next ) {
  
        try{
            if(!req.cookies.token){
                res.send(sendResponse(true,null,"userUnValid","Cookie required")).status(400)
            }else{
                
                let verif =  jwt.verify(req.cookies.token, process.env.SECURE_KEY,(err, decoded) => {
                    if(err){
                res.send(sendResponse(true,err,"UnValid User","error"))
            }else{
                var isueData = new Date().getTime() / 1000;
                console.log("decoded",decoded)
                
                if(decoded.exp < isueData){
                    res.send(sendResponse(false,null,"Token Expires","cause Error")).status(400)
                }else{
                    req.body.token = decoded
                    // console.log("decoded",decoded)
                    next()

                }
                    }
                      });
                      
                console.log("valid userrrs",req.cookies.token)

            }
        }catch(e){
            console.log(e)
        }
    })  

// routers.get('/protected' , Authent.protected, async (req,res) =>{
//     try{
//         res.send(sendResponse(true,null,"userValid","sucess"))
//     }catch(e){
//         console.log(e)
//     }
// })  
 

// It will Run as a PipeLine 1 SignUp and then Login 

routers.get("/users", async (req,res) =>{
    console.log("req.body.token._id",req.body.token)
    try {
        let result = await userModel.findOne({ _id:req.body.token.result._id })
        console.log("result : awdawdhawdgjakwda", result)
        if(!result){
            res.send("result not found")
            
        }else{
            res.send(sendResponse(true,result,"result Found","sucess")).status(200)
        }
    } catch (error) {
            console.log(error)
    }
})


module.exports = routers