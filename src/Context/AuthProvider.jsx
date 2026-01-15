import React, { useEffect } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, GoogleAuthProvider,  onAuthStateChanged,  signInWithEmailAndPassword, signInWithPopup, signOut, } from 'firebase/auth'
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
         setLoding(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logout = () =>{
        setLoding(true);
        return signOut(auth)
    }

    useEffect(() =>{
      
       const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
        setUser(currentUser);
        
       })
       return () => {
        unSubscribe()
       }
    })
    
    const authInfo ={
        registerUser,
        singInUser,
        singInGoogle,
        logout,
    
  }
  return (
   <AuthContext value={authInfo}>
    {children}

   </AuthContext>
  )
}

export default AuthProvider
