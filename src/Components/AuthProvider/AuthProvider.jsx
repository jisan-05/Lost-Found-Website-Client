import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile,
} from "firebase/auth";
import AuthContext from "../AuthContext/AuthContext";
import auth from "../firebase/firebase.init";
import { useEffect, useState } from "react";
import axios from "axios";

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const provider = new GoogleAuthProvider();
    const handleGoogleLogin = () => {
        return signInWithPopup(auth, provider);
    };

    const handleRegister = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const handleLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const handleSignOut = () => {
        return signOut(auth);
    };

    const manageProfile = (name, image) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: image,
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // console.log("curr",currentUser.email)
                const user = { email: currentUser.email };
                axios
                    .post(
                        "https://lost-found-website-server.vercel.app/jwt",
                        user,
                        {
                            withCredentials: true,
                        }
                    )
                    .then((res) => {
                        console.log("data is", res.data);
                        setLoading(false);
                    });
            } else {
                axios
                    .post(
                        "https://lost-found-website-server.vercel.app/logout",
                        {},
                        { withCredentials: true }
                    )
                    .then((res) => {
                        console.log("Logout", res.data);
                    });
                setUser(null);
                setLoading(false);
            }
            console.log("current user", currentUser);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        handleGoogleLogin,
        user,
        handleRegister,
        manageProfile,
        handleSignOut,
        handleLogin,
        loading,
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
