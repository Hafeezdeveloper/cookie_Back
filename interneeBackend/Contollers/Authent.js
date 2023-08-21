const { sendResponse } = require("../Helper/Helper")
const bcrypt = require('bcrypt');
const userModel = require("../Models/UserSchema");
const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const { config } = require("dotenv");
var jwt = require('jsonwebtoken');

let Authent = {
    signUp: async (req,res) =>{
        const {name , email , password } = req.body
        try{
        let obj = {name , email , password}
        let reqArr = ["name","email","password"]
        let errArr = []
    
        reqArr.map( (x) =>{
            if(!obj[x] ){
            errArr.push(x)
            }
        })
    
        if(errArr.length > 0){
            res.send(sendResponse(false,errArr,"missing feilds","error")).status(400)
        }else{
            let result = await userModel.findOne({email})
            if(!result){
                
            let passEnd =  await bcrypt.hash(obj.password,10)
            obj.password = passEnd  
           if(!passEnd){
                res.send(sendResponse(false,null,"pass Not hash","err")).status(400)
           }else{
            let abc =  userModel(obj)
               await abc.save()
               if(!abc){
                res.send(sendResponse(false,null,"not save","err")).status(400)
            }else{
                let config = {
                    service:"gmail",
                    auth: {
                        user: "hafeez122.sidtechno@gmail.com",
                        pass: "bscsfeknxiewezkm"
                    }
                }
    
                const transporter = nodemailer.createTransport(config)
    
                var mailGenerator = new Mailgen({
                    theme: 'salted',
                    textDirection: 'rtl',
                    product: {
                        greeting: 'Dear',
                        signature: 'Sincerely',
                        // Appears in header & footer of e-mails
                        name: 'Mailgen',
                        link: 'https://mailgen.js/',
                        title: 'Welcome to Internee Portal!'
                        // Optional product logo
                        // logo: 'https://mailgen.js/img/logo.png'
                    }
                });
    
                var response = {
                    body: {
                        name: `${obj.name}`,
                        intro: 'Welcome to internee! We\'re very excited to have you on board.',
                        action: {
                            instructions: 'To get started contact with Me',
                            button: {
                                color: '#22BC66', // Optional action button color
                                text: 'Confirm your account',
                                link: 'https://www.linkedin.com/in/hafeez-atif-2005h/'
                            }
                        },
                        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
                    }
                };
    
                var emailText = mailGenerator.generatePlaintext(response);
    
                transporter.sendMail({
                    from: "hafeezatif124@gmail.com", // sender address
                    to: `${obj.email} , ${"hafeezatif124@gmail.com"}`, // list of receivers
                    subject: "Hello This is your code", // Subject line
                    text: emailText, // plain text body
                }).then( (succ) => console.log(succ)).catch(err=>console.log(err))
    
                   res.send(sendResponse(true,abc,"save Sucess","sucess")).status(200)
               }
           }
    }else{
        res.send(sendResponse(false,result,"Your are alerady Registored","error")).status(400)
    }
        }
        }catch(e){
            console.log(e)
        }
    },
    login:async (req,res) =>{
        let { email , password } = req.body
        try{
            let obj = {email , password}    
            let reqArr = ["email","password"]
            let errArr = []
            
            reqArr.map( (x) =>{
                if(!obj[x]){
                    errArr.push(x)
                }
            })
          
            if(errArr.length > 0){
                res.send(sendResponse(false,null,"required Feilds","err")).status(400)
            }else{
              let result = await userModel.findOne({email});
              if(result){
                // here we required to compare userInput passsword and saved Database Password
                let passEndcode = await bcrypt.compare(obj.password,result.password );
                if(passEndcode){
                    // here we can generate token for security purpose
            var token = jwt.sign( {
                //here we save whole result so when we decode it will return all entries
            result:result,
              iat: Math.floor(Date.now() / 1000) - 30 ,
              exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) ,
            },
            process.env.SECURE_KEY);
         if(!token){
                   res.send(sendResponse(false,null,"Token Not generated","error")).status(400)
                }else{
                    // By using middle wear like e-Commers web application
                    //    res.send(sendResponse(true,{user:token, result:result},"User login","success")).status(200)
                    // here we can send Cookire in https headers 
                    //we also set Credential true from Api and cors have crediental and cookie parser
               res.cookie("token",token , {
                    maxAge:86_400_000,
                    httpOnly:true
               })
               res.send(sendResponse(true,{user:result , token:token},"Login SucessFull","sucess")).status(200)

                    }
                }else{
                    res.send(sendResponse(false,null,"Incorrect Pass","error")).status(404)
                }
              }else{
                res.send(sendResponse(false,null,"Login First","error")).status(400)
                console.log(result)
              }
    
            
            }
        }catch(e){
            console.log(e)
        }
    },
    protected: async (req,res,next) =>{
        try {
            let token = req.headers.authorization
            console.log(token)
            let sucess = token.split(' ')[1]                
        let verif =  await  jwt.verify(sucess, process.env.SECURE_KEY,(err, decoded) => {
            if(err){
        res.send(sendResponse(true,err,"UnValid User","error"))
        
    }else{
                res.send(sendResponse(true,decoded,"Valid User","error")).status(200)
                next()
            }
              });
              

        } catch (error) {
                console.log(error)
        }
    },
    protect: async (req,res,next) => {
    console.log( "req.cookies" ,req.cookies.token)
    try {
        if(!req.cookies.token){
            res.send(sendResponse(false, null,"Token Required","eror")).status(400)
        }else{
            
            console.log("error")    
        }
        // let verifyToken = jwt.verify(req.cookies, process.env.SECURE_KEY,(err, decoded) => {
        //  } )
    } catch (err) {
            console.log(err)
    }
},



}

module.exports = Authent