import React, { useState, useEffect } from 'react';
import Burger from './Burger';
import './index.css'
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from './firebase'
import { signInWithPopup, GoogleAuthProvider,FacebookAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Home() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);


// SIgnIn  with Google
  const signInGoogle = () => {
    var provider = new GoogleAuthProvider();
   
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);

      }).catch((error) => {
        alert(error.message)
      })
    setOpen(false);
  }


  // SIgnIn  with Facebook
  const signInFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result)
      }).catch((error) => {
        console.log(error)
      })
    setOpen(false);

  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // user has logged  in
        // console.log(authUser)
        setUser(authUser);
      } else {
        // user logged out
        setUser(null)
      }
    })
    return () => {
      // perform some cleanup action
      unsubscribe();
    }
  }, [user, username])

  //  it run a pices of code based on a specific condition
  // onSnapshot do eevry single time the change happened in firebase, fire this code

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
    .catch((err) => alert(err.message))
    setOpen(false);
  }

  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .catch((err) => alert(err.message))
    setOpenSignIn(false);
  }

  return (
    <div className="App">
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">

            <Input placeholder="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' onClick={signUp}>Sign Up</Button>
            <center>
              <Button onClick={signInGoogle}>Sign in with Google</Button>
              <Button onClick={signInFacebook}>Continue with Facebook</Button>
            </center>
          </form>
        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">

            <Input placeholder="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="password" type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://raw.githubusercontent.com/Mehdi-HAFID/burger/master/src/assets/images/burger-logo.png" alt=" "
        />

        {user ? (
          <Button onClick={() => auth.signOut()}>Logout</Button>
        ) : (
          <div className="">
            <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign Up</Button>
          </div>
        )}

      </div>

      {user ? (
        <Burger username={user} />
      ) : (

        <center>
          <img className="main" src="https://play-lh.googleusercontent.com/KorVx3h3ayFRGWmJWFQKlGCLexDk94htf5NuFXZVV_xKtDSopF8Jvrfgg5u1YClMfro=w600-h300-pc0xffffff-pd" alt="" />
          <p>Sorry you need to login</p>
        </center>
      )}

    </div>
  )
}

export default Home;