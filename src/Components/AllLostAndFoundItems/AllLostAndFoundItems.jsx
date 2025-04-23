import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ItemsCard from "../ItemsCard/ItemsCard";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AuthContext from "../AuthContext/AuthContext";

const AllLostAndFoundItems = () => {
    const [items, setItems] = useState([]);
    const {user} = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axiosSecure.get(
                    `${import.meta.env.VITE_API_URL}/items?email=${user.email}`
                );
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);
    console.log(items);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
            <Helmet>
                <title>Lost & Found | ALL</title>
            </Helmet>
            {items.map((item, idx) => (
                <ItemsCard key={idx} item={item}></ItemsCard>
            ))}
        </div>
    );
};

export default AllLostAndFoundItems;
