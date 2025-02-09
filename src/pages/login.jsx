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
    const LoginUser = () => {
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
        <div>
            <div className="login">
                <form id='login1' onSubmit={LoginUser}>
                    <h2>Login</h2>
                    <br />
                    <TextField id="outlined-basic2" label="Email" variant="outlined" value={email} onChange={(e) => { setEmail(e?.target.value) }} />
                    <br />
                    <TextField id="outlined-basic3" label="Password" variant="outlined" value={password} onChange={(e) => { setPassword(e?.target.value) }} />
                    <br />
                    <Button variant="contained" color="primary" onClick={LoginUser}>
                        Login
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default LoginUser1