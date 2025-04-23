import axios from "axios";
import React, {  useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Components/AuthContext/AuthContext";


const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { handleSignOut } = useContext(AuthContext)
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.interceptors.response.use(
            (response) => {
                return response;
            },
            (err) => {
                console.log("err is --- ", err);
                if (
                    err.response.status === 401 ||
                    err.response.status === 403
                ) {
                    console.log("Need to signOut");
                    handleSignOut().then((res) => {
                        console.log(res);
                        navigate("/login");
                    });
                }
                return Promise.reject(err);
            }
        );
    }, []);

    return axiosSecure;
};

export default useAxiosSecure;
