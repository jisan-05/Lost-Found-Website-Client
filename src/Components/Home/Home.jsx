import React, { useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import axios from "axios";
import ItemsCard from "../ItemsCard/ItemsCard";

const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get(
                    `${import.meta.env.VITE_API_URL}/items`
                );
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    // console.log(items);

    return (
        <div>
            <Slider></Slider>

            <h3 className="text-center text-4xl mt-14 mb-8 font-semibold">Lost & Found Items</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
                {items.map((item) => (
                    <ItemsCard key={item._id} item={item}></ItemsCard>
                ))}
            </div>
        </div>
    );
};

export default Home;
