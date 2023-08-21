import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { getApi, getUserCookire } from '../Api/BaseMethod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Task = () => {
    const navig = useNavigate()
    // Here its by ussing Middle ware like E-commers App
    // const abc = ()=>{
    //     const tokenFromCookie = Cookies.get('tokens');
    //     console.log("tokenFromCookie : ", tokenFromCookie)
    //     axios.get("http://localhost:5000/api/auth/protected",{
    //         headers:{
    //             Authorization:`Berar ${Cookies.get('tokens')}`
    //         },
    //     })  
    //     .then( (suc) =>{
    //         //here we can work for admin
    //         console.log(suc.data.message)
    //         if(suc.data.message !== "UnValid User"){
    //             navig("/dashboard/task")
    //         }else{
    //             navig("/")

    //         }
    //     })
    //     .catch( (err) =>{
    //         console.log(err)
    //     })
        
    // }
    // useEffect( () =>{
    //     abc()
    // },[])
    // deleteCookie('yourCookieName');
    
    useEffect( () =>{
        const User = () =>{
          getUserCookire("/api/auth/users")
          .then( (suc) =>{
            console.log(suc.data)
          })
          .catch( (err) =>{
            console.log(err)
          })
        }
        User()
      },[])
    
    return (
        <div>
            i m Task
        </div>
    )
}

export default Task
