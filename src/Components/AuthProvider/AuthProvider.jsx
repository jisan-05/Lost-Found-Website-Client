import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import AuthContext from "../AuthContext/AuthContext";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
     const [user,setUser] = useState(null)


    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = () =>{
        return signInWithPopup(auth,provider)
    }

    const handleRegister = (email,password) =>{
      return createUserWithEmailAndPassword(auth,email,password)
    }

    const handleLogin = (email,password) =>{
      return signInWithEmailAndPassword(auth,email,password)
    }

    const handleSignOut = () =>{
      return signOut(auth)
    }

    const manageProfile = (name,image) =>{
      return updateProfile(auth.currentUser, {
        displayName:name,
        photoURL:image
      })
    } 

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          if(currentUser){
            setUser(currentUser)
          }
          else{
            setUser(null)
          }
    
          console.log("current user",currentUser)
          return ()=> unsubscribe()
        })
      },[])


    const authInfo = {
        handleGoogleLogin,
        user,
        handleRegister,
        manageProfile,
        handleSignOut,
        handleLogin
        
    };

    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;
