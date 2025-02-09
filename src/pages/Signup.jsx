import { Button, TextField } from '@mui/material'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import React, { useState } from 'react'
import './pages.css'

const Signup = () => {
    ///Signup State ////
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    ///End This///
    ///Signup firebase////
    const signup = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("Signup Response", user)
                // ...
                const auth = getAuth();
                updateProfile(auth.currentUser, {
                    displayName: userName, photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(() => {
                    // Profile updated!
                    // ...
                    const auth = getAuth();
                    sendEmailVerification(auth.currentUser)
                        .then(() => {
                            // Email verification sent!
                            // ...
                            console.log("EmailVerificationSent")
                        });
                }).catch((error) => {
                    // An error occurred
                    // ...
                    console.log("EmailVerificationSentError", error)
                });
            })
            .catch((error) => {
                console.log("Signup Error", error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
    return (
        <div>
            <div className="signup">
                <form id='signup1' onSubmit={signup}>
                    <h2>Signup</h2>
                    <TextField id="outlined-basic1" label="UserName" variant="outlined" value={userName} onChange={(e) => { setUserName(e?.target.value) }} />
                    <br />
                    <TextField id="outlined-basic2" label="Email" variant="outlined" value={email} onChange={(e) => { setEmail(e?.target.value) }} />
                    <br />
                    <TextField id="outlined-basic3" label="Password" variant="outlined" value={password} onChange={(e) => { setPassword(e?.target.value) }} />
                    <br />
                    <Button variant="contained" color="primary" onClick={signup}>
                        Sign Up
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup
