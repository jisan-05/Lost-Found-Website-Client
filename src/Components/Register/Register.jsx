import React, { useContext } from "react";
import AuthContext from "../AuthContext/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const { handleRegister, manageProfile, handleGoogleLogin,handleSignOut } =
        useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const image = form.image.value;
        const password = form.password.value;
        // console.log(name, email, image, password);

        handleRegister(email, password).then((res) => {
            toast.success("New User Register successful")
            manageProfile(name, image)
            handleSignOut()
            console.log(res)
        });
    };

    const handleGoogle = () => {
        handleGoogleLogin()
            .then((result) => {
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
                            onSubmit={handleRegisterSubmit}
                        >
                            <h1 className="text-4xl font-bold">Register Now</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    className="input input-bordered"
                                    required
                                />
                            </div>
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
                                    <span className="label-text">
                                        Photo Url
                                    </span>
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Photo Url"
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
                            <div>
                                {/* <p className="text-red-500">{error}</p> */}
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary w-full">
                                    Register
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
                                I Have an Account?{" "}
                                <Link
                                    className="text-blue-700 font-bold"
                                    to="/login"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
