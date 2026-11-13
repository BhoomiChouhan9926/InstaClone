import { login } from "../service/auth.api";
import { register } from "../service/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";


 export const useAuth = ()=>{
    const context = useContext(AuthContext)
    const {user, setUser,loading , setLoading} = context ;

    const handelLogin = async (username,password)=>{
        setLoading(true)
       const response = await login(username,password)
       setUser(response.user)
       setLoading(false)

    }

    const handelRegister = async(email,username,password) =>{
        setLoading(true)
        const response = await register(email, username,password)
        setUser(response.user)
        setLoading(false)
    }
return {
    user,loading,handelLogin,handelRegister
}

 }