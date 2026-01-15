import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "../Component/firebase/firebase.init";
import useAuth from "../Hooks/useAuth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState(null);   
      const [loading, setLoading] = useState(true);   



  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const singInUser = (email, password) => {
      setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const singInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
   

    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth user:", currentUser);
      setUser(currentUser);
    });
    console.log(user);

    return () => unSubscribe();
  }, []);

  const authInfo = {
    registerUser,
    singInUser,
    singInGoogle,
    logout,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
