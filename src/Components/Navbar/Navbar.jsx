import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import AuthContext from "../AuthContext/AuthContext";

const Navbar = () => {
    const { user, handleSignOut } = useContext(AuthContext);

    const signOut = () => {
        handleSignOut();
    };
    console.log(user?.photoURL);

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    Lost and Found
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/lostAndFound">Lost & Found Items</NavLink>
                    </li>
                </ul>
            </div>
            <div className="navbar-end gap-4">
                <div className="dropdown dropdown-end z-50">
                    <div tabIndex={1}>
                        {user?.photoURL ? (
                            <img
                                src={user.photoURL}
                                className="w-12 h-12 rounded-full"
                                alt="User"
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                    <ul
                        tabIndex={1}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                    >
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/lostAndFound">
                                Lost & Found Items
                            </NavLink>
                        </li>
                        {user ? (
                            <li onClick={signOut}>
                                <Link>Logout</Link>
                            </li>
                        ) : (
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>

                {user ? (
                    <></>
                ) : (
                    <Link to="/login">
                        <button className="btn btn-primary ">Login</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
