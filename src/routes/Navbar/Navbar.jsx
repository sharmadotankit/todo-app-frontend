import React,{useContext} from 'react'
import { Link,Outlet, useNavigate } from "react-router-dom";
import './Navbar.scss';
import {ApplicationContext} from "../../context/context";

function Navbar() {
    const {currentUser,setCurrentUser} = useContext(ApplicationContext);
    
  const navigate = useNavigate();

    const handleLogout = () =>{
        setCurrentUser({
            name:null,
            email:null,
            token:null,
            _id:null,
            isLoggedIn:false,
        })
        localStorage.setItem("name","");
        localStorage.setItem("email", "");
        localStorage.setItem("_id", "");
        localStorage.setItem("token", "");
        localStorage.setItem("isLoggedIn", false);
        navigate('/login')
    }


    return (
      <React.Fragment>
        <nav className="navigation">
            <Link to='/' className='app-title'>
                <h1>Todo Application</h1>
            </Link>
            <div className="nav-links-container">
                {currentUser?.isLoggedIn?
                    <>
                        <Link className='nav-link' to='/' onClick={handleLogout}>
                            SignOut
                        </Link>
                    </>
                    :
                    <>
                        <Link className='nav-link' to='/signup'>
                            SignUp
                        </Link>
                        <Link className='nav-link' to='/login'>
                            SignIn
                        </Link>
                    </>
                }
            </div>
        </nav>
        <Outlet/>
      </React.Fragment>
    )
}
export default Navbar;