import { Box, Checkbox, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import BsInp from '../Comp/BsInp'
import MailIcon from '@mui/icons-material/Mail';
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Bscheck from '../Comp/BsCheck';
import BsButon from '../Comp/BsButon';
import ButtonGreen from '../Comp/ButtonGreen';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { getApi, postApi } from '../Api/BaseMethod';
import Swal from 'sweetalert2';
import Capture from  "../../src/Cap.png"
import BsSnake from '../Comp/BsSnake';

const SignUp = () => {
  const navig = useNavigate()
  const [message,setMessage] = useState("")
  const [open,setOpen] = useState(false)
  const [loading,setLoding] = useState(false)

    const [model,setModel] = useState({})

    const signUpBtn = () =>{
      if(!model.name){
        setOpen(true)
        setMessage("Required Name")
        return
      }
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
      setLoding(true)
      
      postApi("/api/auth/signUp",model)
      .then( (succ) =>{
        navig("/")
        console.log(succ.data)
      }).catch( (err) =>{
      setLoding(false)
        console.log(err)
      })
    }
  return (
    <div className='mt-4'>
      <BsSnake open={open} close={(e) => setOpen(e)} message={message} />
      <Box  className='d-flex m-auto   ' sx={{alignItems:"center",height:"78vh", width:{md:"344px",sm:"344px",xs:"100%"}}}>
        <Box>
        <img width={"100%"} src={Capture} alt="" />
        <Box id="bx_fll" className="shadow mt-2  p-3">
            <div className=''>
            <TextField
            className='w-100'          
            placeholder='Name'
            onChange={(e) => setModel({...model,name:e.target.value})}
            value={model.name || ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton  edge="end">
                <PersonIcon/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
            <TextField
            className='w-100 mt-2'          
            placeholder='Email'
            onChange={(e) => setModel({...model,email:e.target.value})}
            value={model.email || ""}
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
        <div className='my-2'>
    <TextField
            className='w-100'          
            placeholder='Password'
            type='password'
            onChange={(e) => setModel({...model,password:e.target.value})}
            value={model.password || ""}
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
        <ButtonGreen loading={loading} onClick={signUpBtn} name="Sign Up" />
            </div>
        </Box>

        </div>
        <div className='text-center my-3'>
              <Typography variant="p">Already have account </Typography>
              <span style={{cursor:"pointer",fontWeight:600}} onClick={() => navig("/") } className='text-success '>Login In</span>
          </div>
            </div>
        </Box>
        </Box>
      </Box>
    </div>
  )
}

export default SignUp
