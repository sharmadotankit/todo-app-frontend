import axios from 'axios';



const backendUrl = process.env.REACT_APP_API_ENDPOINT;

export const signUp =  (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let response = await axios.post(`${backendUrl}/auth/create-user`,data);
            resolve(response.data);
        }catch(err){
            reject(err);
        }
    });
}

export const login =  (data)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let response = await axios.post(`${backendUrl}/auth/login`,data);
            resolve(response.data);
        }catch(err){
            reject(err);
        }
    });
}



