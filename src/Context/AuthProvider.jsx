import React from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider,  signInWithEmailAndPassword, signInWithPopup, } from 'firebase/auth'
import { auth } from '../Component/firebase/firebase.init'


const googleProvider =new GoogleAuthProvider

const AuthProvider = ({children}) => {

    const registerUser =(email, password) => {
        return createUserWithEmailAndPassword( auth ,email ,password)
    }
    const singInUser =(email, password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const singInGoogle = () =>{
        return signInWithPopup(auth, googleProvider);
    }
    
    const authInfo ={
        registerUser,
        singInUser,
        singInGoogle
    
  }
  return (
   <AuthContext value={authInfo}>
    {children}

   </AuthContext>
  )
}

export default AuthProvider
