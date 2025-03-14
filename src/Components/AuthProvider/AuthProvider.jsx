import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import AuthContext from "../AuthContext/AuthContext";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
     const [user,setUser] = useState(null)


    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = () =>{
        return signInWithPopup(auth,provider)
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
        user
        
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
