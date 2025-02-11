import { Button, TextField } from '@mui/material'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from "firebase/auth";

import React, { useState } from 'react'
import './pages.css'

const Signup = () => {

    // Signup javascript ///
    // const form = document.querySelector('#form')
    // const username = document.querySelector('#username');
    // const emailOne = document.querySelector('#email');
    // const passwordOne = document.querySelector('#password');
    // const cpassword = document.querySelector('#cpassword');

    // form.addEventListener('submit', (e) => {

    //     if (!validateInputs()) {
    //         e.preventDefault();
    //     }
    // })

    // function validateInputs() {
    //     const usernameVal = username.value.trim()
    //     const emailVal = emailOne.value.trim();
    //     const passwordVal = passwordOne.value.trim();
    //     const cpasswordVal = cpassword.value.trim();
    //     let success = true

    //     if (usernameVal === '') {
    //         success = false;
    //         setError(username, 'Username is required')
    //     }
    //     else {
    //         setSuccess(username)
    //     }

    //     if (emailVal === '') {
    //         success = false;
    //         setError(emailOne, 'Email is required')
    //     }
    //     else if (!validateEmail(emailVal)) {
    //         success = false;
    //         setError(emailOne, 'Please enter a valid email')
    //     }
    //     else {
    //         setSuccess(emailOne)
    //     }

    //     if (passwordVal === '') {
    //         success = false;
    //         setError(passwordOne, 'Password is required')
    //     }
    //     else if (passwordVal.length < 8) {
    //         success = false;
    //         setError(passwordOne, 'Password must be atleast 8 characters long')
    //     }
    //     else {
    //         setSuccess(passwordOne)
    //     }

    //     if (cpasswordVal === '') {
    //         success = false;
    //         setError(cpassword, 'Confirm password is required')
    //     }
    //     else if (cpasswordVal !== passwordVal) {
    //         success = false;
    //         setError(cpassword, 'Password does not match')
    //     }
    //     else {
    //         setSuccess(cpassword)
    //     }

    //     return success;

    // }
    // //element - password, msg- pwd is reqd
    // function setError(element, message) {
    //     const inputGroup = element.parentElement;
    //     const errorElement = inputGroup.querySelector('.error')

    //     errorElement.innerText = message;
    //     inputGroup.classList.add('error')
    //     inputGroup.classList.remove('success')
    // }

    // function setSuccess(element) {
    //     const inputGroup = element.parentElement;
    //     const errorElement = inputGroup.querySelector('.error')

    //     errorElement.innerText = '';
    //     inputGroup.classList.add('success')
    //     inputGroup.classList.remove('error')
    // }

    // const validateEmail = (emailOne) => {
    //     return String(emailOne)
    //         .toLowerCase()
    //         .match(
    //             /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //         );
    // };
    // // Signup javascript ///







    ///Signup State ////
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    ///End This///
    ///Signup firebase////
    const signup = (e) => {
        e.preventDefault()
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
        <>
        <div className="bodySignup">
            <div className="container">
                <form action="" id="form">
                    <h1>Signup</h1>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" name="username" value={userName} onChange={(e) => { setUserName(e?.target.value) }} />
                        <div className="error"></div>
                    </div>
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
                    <div className="input-group">
                        <label htmlFor="cpassword">Confirm Password</label>
                        <input type="password" id="cpassword" name="cpassword"  />
                        <div className="error"></div>
                    </div>
                    <button type="submit" onClick={signup}>Signup</button>
                </form>
            </div>
            </div>
        </>
    )
}

export default Signup
