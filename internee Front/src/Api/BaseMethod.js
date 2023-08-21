import axios from "axios";


const baseHandler = axios.create({
    baseURL:"http://localhost:5000"
})

let getApi = (endPoint) =>{
    return baseHandler.get(endPoint)
}

let postApi  = (endPoint,body) =>{
    return baseHandler.post(`${endPoint}`,body)
}

let putApi = (endPoint,id,body) =>{
    return  baseHandler.put(`${endPoint}/${id}`,body)
}
let deleteApi = (endPoint,id,body) =>{
    return  baseHandler.delete(`${endPoint}/${id}`,body)
}
let getApiAllData = () =>{
    return
}

let postApiLogin  = (endPoint,body) =>{
    return baseHandler.post(`${endPoint}`,body ,{withCredentials:true})
}
let getUserCookire  = (endPoint) =>{
    return baseHandler.get(`${endPoint}` ,{withCredentials:true})
}


export {getApi,postApi,putApi,deleteApi,postApiLogin,getUserCookire}