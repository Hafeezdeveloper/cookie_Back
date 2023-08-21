import { Box, Checkbox, IconButton, TextField, Typography, useScrollTrigger } from '@mui/material'
import React, { useEffect, useState } from 'react'
import BsInp from '../Comp/BsInp'
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Bscheck from '../Comp/BsCheck';
import BsButon from '../Comp/BsButon';
import ButtonGreen from '../Comp/ButtonGreen';
import { useNavigate } from 'react-router-dom';
import Capture from  "../../src/Cap.png"
import { getUserCookire, postApi, postApiLogin } from '../Api/BaseMethod';
import BsSnake from '../Comp/BsSnake';
import Cookies from 'js-cookie';

const Login = () => {
  const navig = useNavigate()
  const [message,setMessage]= useState("")
  const [open,setOpen]= useState(false)
  const [loading,setLoading]= useState(false)
  const [model,setModel] = useState({})

  const loginBtn = () =>{
    if(!model.email){
      setOpen(true)
      setMessage("Required Email")
      return
    }
    if(!model.password){
      setOpen(true)
      setMessage("Required Password")
      return
    }
    setLoading(true)
    

    // postApi("/api/auth/login",model)
    // .then( (succ) =>{
    //   console.log(succ.data.message)
    //   if(succ.data.message == "Login First"){
    //     console.log("login firest")
    //     setOpen(() => true)
    //     setMessage("Login First")
    //   }else{
    //     Cookies.set('tokens', succ?.data?.data.user, { expires: 7 });
    //     navig("/dashboard/task")
    //   }
    //   // console.log(succ?.data?.data.user)
    //   setLoading(false)
    // })
    // .catch( (err) =>{
    //   setLoading(false)
    //   console.log(err)
    // })

    postApiLogin("/api/auth/login",model)
    .then( (suc) =>{
    setLoading(false)
      console.log(suc?.data)
    })
    .catch( (err) =>{
    setLoading(false)

      console.log(err)
    })
  }
  



  return (
    <div className='mt-4'>
      <BsSnake open={open} close={(e) => setOpen(e) }  message={message}/>
      <Box  className='d-flex m-auto  ' sx={{alignItems:"center",height:"78vh", width:{md:"344px",sm:"344px",xs:"100%"}}}>
        <Box>
        <img width={"100%"} src={Capture} alt="" />
        <Box id="bx_fll" className="shadow mt-2 p-3">
            <div className=''>
            <TextField
            onChange={(e) => setModel({...model,email:e.target.value})}
            value={model.email || ""}
            className='w-100'          
            placeholder='Email'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton  edge="end">
                <MailIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <div className='my-3'>
    <TextField
      onChange={(e) => setModel({...model,password:e.target.value})}
      value={model.password || ""}
            className='w-100'          
            placeholder='Password'
            type='password'
            InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                <IconButton  edge="end">
                <LockIcon/>
                </IconButton>
              </InputAdornment>
            ),
        }}
        />
        <Box id="bs_blck" className='mt-3 d-flex justify-content-between'>
            <div className='d-flex '>
            <Checkbox   color="success" id="abc1" className='xyz1' />
        <label className='pt-2  abc1' htmlFor="abc1">Remember Me</label>
            </div>
            <div  className="flx_btn mt-1">
        <ButtonGreen loading={loading} onClick={loginBtn} name="Login In" />
            </div>
        </Box>
          <div className='text-center my-3'>
              <Typography variant="p">Don't have account </Typography>
              <span style={{cursor:"pointer",fontWeight:600}} onClick={() => navig("/signUp") } className='text-success '>Sign Up</span>
          </div>
        </div>
            </div>
        </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Login
