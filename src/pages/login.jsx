import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './pages.css'

const LoginUser1 = () => {
    //login state .// 
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState("");
    ///end this///
    //login firebase///
    const LoginUser = (e) => {
        e.preventDefault()
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("LoginUser", user)
                // ...
            })
            .catch((error) => {
                console.log("LoginError" , error)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }
    return (
        <>
         <div className="container">
                <form action="" id="form">
                    <h1>Login</h1>
                    
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" value={email} onChange={(e) => { setEmail(e?.target.value) }} />
                        <div className="error"></div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={password} onChange={(e) => { setPassword(e?.target.value) }} />
                        <div className="error"></div>
                    </div>
                   
                    <button type="submit" onClick={LoginUser}>Login</button>
                </form>
            </div>
        </>
    )
}

export default LoginUser1

        