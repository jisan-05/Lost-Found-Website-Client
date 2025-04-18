import axios from "axios";
import React, { useEffect, useState } from "react";
import ItemsCard from "../ItemsCard/ItemsCard";

const AllLostAndFoundItems = () => {
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
    console.log(items);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
            {items.map((item) => (
                <ItemsCard key={items._id} item={item}></ItemsCard>
            ))}
        </div>
    );
};

export default AllLostAndFoundItems;
