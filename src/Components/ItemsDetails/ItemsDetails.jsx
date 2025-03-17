import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { useParams } from "react-router-dom";
import AuthContext from "../AuthContext/AuthContext";
import toast from "react-hot-toast";

const ItemsDetails = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [location,setLocation] = useState("")
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const [item, setItem] = useState([]);
    // console.log(id)

    useEffect(() => {
        fetchJobDetails();
    }, [id]);

    // Recovered Info 
    const recoveryData = {
        location,
        recoveredDate: startDate,
        recoveredBy: {
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
        },
    };
    
    const handleSubmit =async () => {
        const {data} =await axios.post(`${import.meta.env.VITE_API_URL}/recoveredItems`, recoveryData)
        console.log(data)
        if(data.acknowledged){
            toast.success('Recovered Successful')
        }
    } 



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
        Date:itemDate,
        contactInfo,
        _id,
    } = item;
    // console.log(item);

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
                            <span className=" font-semibold text-xl">
                                Category:
                            </span>
                            <span className="text-lg">{Category}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className=" font-semibold text-xl">
                                {" "}
                                Location:
                            </span>
                            <span className="text-lg">{Location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className=" font-semibold text-xl">
                                {" "}
                                Date:
                            </span>
                            <span className="text-lg">{Date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className=" font-semibold text-xl">
                                Post Type:
                            </span>
                            <span className="text-lg">{postType}</span>
                        </div>
                    </div>

                    <div className="">
                        {postType === "Lost" ? (
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_1")
                                        .showModal()
                                }
                                className="btn btn-primary text-center"
                            >
                                Found This!
                            </button>
                        ) : (
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("my_modal_1")
                                        .showModal()
                                }
                                className="btn btn-primary text-center"
                            >
                                This is Mine!
                            </button>
                        )}
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box p-24">
                                {/* Recovery Form */}
                                <h3 className="font-bold text-xl text-center mb-4">
                                    Recovery Details
                                </h3>

                                <div className="space-y-4">
                                    {/* Recovered Location */}
                                    <div>
                                        <label className="block font-semibold mb-1">
                                            Recovered Location
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={location || ""}
                                            onChange={(e)=> setLocation(e.target.value)}
                                            className="input input-bordered w-full"
                                            placeholder="Enter location"
                                        />
                                    </div>

                                    {/* Date Picker */}
                                    <div>
                                        <label className="block font-semibold mb-1">
                                            Recovered Date
                                        </label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) =>
                                                setStartDate(date)
                                            }
                                        />
                                    </div>

                                    {/* Recovered By (User Info) */}
                                    <div>
                                        <label className="block font-semibold mb-1">
                                            Recovered By
                                        </label>
                                        <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg">
                                            <img
                                                src={user?.photoURL}
                                                alt="User"
                                                className="w-10 h-10 rounded-full border"
                                            />
                                            <div>
                                                <p className="font-semibold">
                                                    {user?.name}
                                                </p>
                                                <p className="text-gray-500">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="modal-action flex justify-end">
                                        <button
                                            className="btn btn-outline"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "my_modal_1"
                                                    )
                                                    .close()
                                            }
                                        >
                                            Cancel
                                        </button>
                                        <button className="btn btn-primary" onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsDetails;
