import React, {useContext, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./Signup.scss"
import {signUp} from '../../utils/actions/authActions';
import { ApplicationContext } from '../../context/context';
import { toast } from 'react-toastify';


function Signup() {
    const [userData,setUserData] = useState({
        name:'',
        email:'',
        password:'',
    })
    const navigate = useNavigate();

    const [error,setError] = useState('');

    const {setCurrentUser} = useContext(ApplicationContext);

    const handleOnSignUp =async ()=>{
        try{
            setError('')
        const {name,email,password} = userData;
        if(!name){
            setError("Enter a valid name");
            return;
        }
        if(!email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
            setError("Enter a valid email");
            return;
        }
        if(!password || !/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password)){
            setError("Enter a valid password");
            return;
        }

        let response = await signUp(userData);
        if(response.status){
            setCurrentUser({
                name:response?.data?.name,
                email:response?.data?.email,
                token:response?.data?.token,
                _id:response?.data?._id,
                isLoggedIn:true,
            });

            localStorage.setItem("name", response?.data?.name);
            localStorage.setItem("email", response?.data?.email);
            localStorage.setItem("_id", response?.data?._id);
            localStorage.setItem("token", JSON.stringify(response?.data?.token));
            localStorage.setItem("isLoggedIn", true);
            
            toast.success("User login successful");
            navigate("/home")
        }else{
            toast.error("Something went wrong while registering the user.Please try again later.")
        }
        }
        catch(err){
            console.log('error',err)
            toast.error(err?.response?.data?.message || "Something went wrong");
            return;
        }
        
    }

    const handleUserInfoChange = (e)=>{
        setUserData({...userData , [e.target.name] : e.target.value})
    }

    const onKeyDown = (e) => {
        const code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
          e.preventDefault()
          handleOnSignUp();
        }
      }

    return (
        <>
        <div className="signUpDiv">
            <div className="container-signup">
                <h1 className='signup-heading'>Register</h1>
                <p className='signup-heading'>Please fill in this form to create an account.</p>
                <label htmlFor="name"><b>Name</b></label>
                <input 
                    type="text" 
                    placeholder="Enter Name" 
                    name="name" id="name" 
                    onChange={handleUserInfoChange}
                    onKeyDown={onKeyDown} 
                />

                <label htmlFor="email"><b>Email</b></label>
                <input 
                    type="email" 
                    placeholder="Enter Email" 
                    name="email" 
                    id="email" 
                    onChange={ handleUserInfoChange}
                    onKeyDown={onKeyDown}
                />

                <label htmlFor="psw"><b>Password</b></label>
                <input 
                    type="password" 
                    placeholder="Enter Password" 
                    name="password" 
                    id="psw" 
                    onChange={handleUserInfoChange}
                    onKeyDown={onKeyDown}
                />
                {
                    error && error==='Enter a valid password'?
                        <div style={{color:"red",fontSize:'14px'}}>
                            <p>Password must be :  </p>
                            <li>at least 8 character long</li>
                            <li>at least 1 symbol</li>
                            <li>at least 1 lower case</li>
                            <li>at least 1 upper case</li>
                        </div>
                        :
                        null
                }

                <button type="submit" className="registerbtn" onClick={handleOnSignUp}>Register</button>
           
                <div>
                    <p>Already have an account? <Link to="/login" className='button-link'>Sign in</Link>.</p>
                    {error?
                        <h4 style={{color:'red',marginTop:'20px'}}>{error}</h4>:null
                    }
                </div>

            </div>
        </div>
            
        </>
    );
}

  export default Signup
