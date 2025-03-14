import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../AuthContext/AuthContext";

const Navbar = () => {
    const { user, handleSignOut } = useContext(AuthContext);

    const links = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/lostAndFound">Lost & Found Items</NavLink>
            </li>
        </>
    );

    const signOut = () => {
        handleSignOut();
    };
    // console.log(user?.photoURL)

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            {" "}
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />{" "}
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">Lost and Found</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end gap-2">
                <div>
                    {
                        user && <img src={user?.photoURL} className="w-12 h-12 rounded-full " alt="" />
                    }
                </div>

                {user ? (
                    <button className="btn bg-orange-700 text-white" onClick={signOut}>
                        Logout
                    </button>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-primary">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
