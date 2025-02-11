// import logo from './logo.svg';
import RandomRoute from './compount/RandomRoute'
import './App.css';
import { initializeApp } from "firebase/app";
import { useContext, useEffect, useState } from 'react';
// import Routes1 from './componeent/Router1'
import { Link, Route, Routes } from 'react-router';
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, updateEmail, verifyBeforeUpdateEmail } from 'firebase/auth';
import { GlobalContext } from './context/context';
import { Button, Container, Modal, Nav, Navbar } from 'react-bootstrap';
import { TextField } from '@mui/material';
// import Image from 'logout.png';
import gitHub from "./images/github.png";
import Facebook from "./images/facebook.png"
import Google from "./images/google.png"
import { GithubAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";


function App() {
  // Firebase Config //
  const firebaseConfig = {
    apiKey: "AIzaSyDq-EGe66C9WrL86EmKC5yEzNfcFQ7cCWA",
    authDomain: "project-on-f6a21.firebaseapp.com",
    projectId: "project-on-f6a21",
    storageBucket: "project-on-f6a21.firebasestorage.app",
    messagingSenderId: "919077890652",
    appId: "1:919077890652:web:ed7c13f308a93ad23c5499"
  };
  // End Firebase Config //

  // initialize firebase //
  const app = initializeApp(firebaseConfig);
  //End this //'

  // userGoogle //
  const provider2 = new GoogleAuthProvider();

  const userGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider2)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("UserGoogle res", user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log("UserGoogle error", error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }


  // userFacebook //
  const provider1 = new FacebookAuthProvider();
  const signInWithFacebook = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider1)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log("UserFacebook res", user)

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        console.log("UserFcebook err", error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }

  // UserGithub //
  const provider = new GithubAuthProvider();
  const signInWithGithub = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;
        console.log("Github Res", user)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.log("Github Err", error)
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GithubAuthProvider.credentialFromError(error);
        // ...
      });

  }

  // End this ///

  // user State //
  const [newEmail, setNewEmail] = useState("");
  const [showForm, setShowForm] = useState(false)
  let { state, dispatch } = useContext(GlobalContext)
  // End this //

  // useEffect //
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log("user is signed in", user);
        dispatch({ type: "USER_LOGIN", payload: user })
        // ...
      } else {
        dispatch({ type: "USER_LOGOUT" })
        console.log("userNotFound")
        // User is signed out
        // ...
      }
    });
  }, [])
  // End this //

  // user Logout //
  const userLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  // End this //

  // user ChangeEmail //
  const changeEmail = (e) => {
    e.preventDefault();
    const auth = getAuth();
    verifyBeforeUpdateEmail(auth.currentUser, newEmail).then(() => {
      // Email updated!
      console.log("Email updated!")
      // ...
    }).catch((error) => {
      // An error occurred
      console.log(" An error occurred", error)
      // ...
    });
  }
  // End this //

  // modal State //
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // End this //

  return (
    <>
      {(state?.isLogin == true) ?
        <div className="div">
          <div className="div1">
            <Navbar>
              {/* <Navbar.Brand href="#home">ECommerce Website</Navbar.Brand> */}
              <Nav className="me-auto1">
                {/* <img src={Image}alt="" /> */}
                  <button onClick={userLogout} id='button'>Logout</button>
              </Nav>
            </Navbar>
          </div>
          <div className="div2">
            <div className="changeEmail1">
              <Button variant="primary" onClick={handleShow}>
                Enter New Email
              </Button>
            </div>
            <div className="changeEmail2">

              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Enter New Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="newEmail">
                    <form onSubmit={changeEmail} id='newEmail1'>
                      <TextField id="outlined-basic hammad1" label="newEmail" variant="outlined" value={newEmail} onChange={(e) => { setNewEmail(e?.target.value) }} />
                      {/* <Button variant="secondary">
                        submit
                      </Button> */}
                    </form>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={changeEmail}>Submit</Button>
                </Modal.Footer>
              </Modal>
            </div>



          </div>
        </div>

        :
        <div className='header'>
          <div className="header1">
            <Link className='link' to={"/sign"}>SignUp</Link>
            <Link className='link' to={"/login"}>Login</Link>
          </div>
          <div className="header2">
            <img src={gitHub} alt="" onClick={signInWithGithub} />
            <img src={Facebook} alt="" onClick={signInWithFacebook} />
            <img src={Google} alt="" onClick={userGoogle} />
            {/* <button onClick={UserGithub}>Click me</button> */}
          </div>
        </div>
      }

      {/* <h1>hello world kia hal ha marlet ka</h1> */}
      <div>
        {/* <Login/> */}
      </div>
      <div className="routes12">
        <RandomRoute />
      </div>
    </>
  );
}

export default App;
