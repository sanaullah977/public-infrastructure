import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Component/firebase/firebase.init";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
      const [user, setUser] = useState();   
      const [loading, setLoading] = useState(true);   

      



  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
      setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

   const updateUserProfile = async (name, photo) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    setUser({ ...auth.currentUser });
  };

  useEffect(() => {
   

    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Auth user:", currentUser);
      setUser(currentUser);
      setLoading(false)
    });
   

    return () => unSubscribe();
  }, []);
  console.log(user);

  const authInfo = {
    registerUser,
    signInUser,
    signInGoogle,
    user,
    logout,
    updateUserProfile,
    loading,
    setLoading
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;