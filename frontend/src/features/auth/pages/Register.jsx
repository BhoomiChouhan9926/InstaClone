import React, { useState } from 'react'
import '../style/form.scss'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router'

const Register = () => {

    const{user,loading,handelRegister} = useAuth();

    const [email    ,  setEmail] = useState("")
    const [username , setUsername] = useState("")
    const [password , setPassword] = useState("")

    const navigate = useNavigate();

    const handelSubmit = async(e)=>{
        e.preventDefault();
        await handelRegister(email,username,password)
        console.log("Registered successfully")
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
        <h2>Register</h2>
        <form onSubmit={handelSubmit}>
             <input 
             onInput={(e)=>{setEmail(e.target.value)}}
            type="email"
             placeholder='email'
              id='email' 
             name='email'
              />
            
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
              <button className='button primary-button'>Register</button>
        </form>
        <p>Already have an account? <Link to='/login'>Login to account.</Link> </p>
    </div>
   </main>
  )
}

export default Register
