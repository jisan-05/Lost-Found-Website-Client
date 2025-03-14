import AuthContext from "../AuthContext/AuthContext";

const AuthProvider = ({ children }) => {
    const authInfo = {
        names: "jisan",
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
