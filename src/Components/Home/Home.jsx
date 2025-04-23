import React, { useContext, useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import axios from "axios";
import ItemsCard from "../ItemsCard/ItemsCard";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AuthContext from "../AuthContext/AuthContext";

const Home = () => {
    const [items, setItems] = useState([]);
    // const axiosSecure = useAxiosSecure()
    // const {user} =useContext(AuthContext)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/items`
                );
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    // console.log(items);

    return (
        <div>
            <Helmet>
                <title>Lost & Found | Home</title>
            </Helmet>
            <Slider></Slider>

            <h3 className="text-center text-4xl mt-14 mb-8 font-semibold">
                Lost & Found Items
            </h3>

            {loading ? (
                <div className="text-center h-80 w-full flex justify-center items-center ">
                    <span className="loading loading-bars loading-xl text-5xl text-blue-800"></span>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5 ">
                    {items.map((item) => (
                        <ItemsCard key={item._id} item={item}></ItemsCard>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
