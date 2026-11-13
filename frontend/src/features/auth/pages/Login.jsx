import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'
const Login = () => {
    const {user,loading ,handelLogin} = useAuth();

    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");

    const navigate = useNavigate()


    const handelSubmit  = async(e)=>{
           e.preventDefault();
          await handelLogin(username,password)
          console.log("User Logged in")
          navigate('/')

    }

    if(loading){
    return(
        <main>
            <h2>loading...</h2>
        </main>
    )
}
  return (
   <main>
    <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handelSubmit} >
            <input 
            onInput={(e)=>{setUsername(e.target.value)}}
            type="text"
             placeholder='username'
              id='username' 
             name='username'
              />
              <input 
              onInput={(e)=>{setPassword(e.target.value)}}
            type="text"
             placeholder='password'
              id='password' 
              name='password'
             
              />
              <button className='button primary-button'>Login</button>
        </form>
        <p>Don't have an account? <Link to= '/register'>Create one.</Link></p>
    </div>
   </main>
  )
}

export default Login
