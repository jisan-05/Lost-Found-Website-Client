import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
    const { handleGoogleLogin, handleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignIn = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);
    handleLogin(email, password).then((res) => {
            toast.success("Login Successful");
            if(!location.state){
                navigate('/')
            }else{
                navigate(location.state.from);
            }
            console.log("login successful", res);
        });
    };
    console.log(location)
    const handleGoogle = () => {
        handleGoogleLogin()
            .then((result) => {
                toast.success("login Successful");

                    if(!location.state){
                        navigate('/')
                    }else{
                        navigate(location.state.from);
                    }
                
                console.log(result);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className="hero bg-base-200 ">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card bg-base-100 w-full max-w-sm p-8 shrink-0 shadow-2xl">
                        <form
                            className="card-body space-y-1"
                            onSubmit={handleSignIn}
                        >
                            <h1 className="text-4xl font-bold">Login now!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary w-full">
                                    Login
                                </button>
                            </div>
                            <div className="divider">OR</div>
                        </form>
                        <div className="space-y-5 px-8">
                            <button
                                onClick={handleGoogle}
                                className="btn bg-orange-600 text-white w-full"
                            >
                                Login With Google
                            </button>
                            <p className="text-center">
                                Dont Have an Account?{" "}
                                <Link
                                    className="text-blue-700 font-bold"
                                    to="/register"
                                >
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
