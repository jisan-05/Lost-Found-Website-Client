import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ItemsDetails = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    // console.log(id)

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    const fetchJobDetails = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/items/${id}`
        );
        setItem(data);
    };

    const {
        postType,
        Thumbnail,
        Title,
        Description,
        Category,
        Location,
        Date,
        contactInfo,
        _id,
    } = item;
    console.log(item);

    return (
        <div className="flex justify-center items-center my-10 p-4 ">
            <div className="card w-full md:w-3/4 lg:w-1/2 shadow-2xl rounded-xl overflow-hidden transform transition-all duration-300">
                {/* Thumbnail Image */}
                <figure className="relative h-64 overflow-hidden">
                    <img
                        src={Thumbnail}
                        alt={Title}
                        className="w-full h-full object-cover transition-transform duration-300 "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </figure>

                {/* Card Content */}
                <div className="card-body p-6">
                    <h2 className="card-title text-4xl font-bold mb-4 ">
                        {Title}
                    </h2>
                    <p className=" text-lg mb-6">{Description}</p>

                    {/* Details Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                            <span className=" font-semibold text-xl">Category:</span>
                            <span className="text-lg">{Category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className=" font-semibold text-xl"> Location:</span>
                            <span className="text-lg">{Location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className=" font-semibold text-xl"> Date:</span>
                            <span className="text-lg">{Date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className=" font-semibold text-xl">
                                 Post Type:
                            </span>
                            <span className="text-lg">{postType}</span>
                        </div>
                    </div>

                    <div>
                        {postType === "Lost" ? (
                            <button className="btn btn-primary text-center">Found This!</button>
                        ) : (
                            <button className="btn btn-primary text-center">This is Mine!</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsDetails;
