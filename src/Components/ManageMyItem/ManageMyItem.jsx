import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import axios from "axios";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageMyItem = () => {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const axiosSecure = useAxiosSecure()

    const fetchItems = async () => {
        try {
            const { data } = await axiosSecure.get(
                `/items/user/${user.email}`
            );
            setItems(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [user.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                const { data } = await axiosSecure.delete(
                    `${import.meta.env.VITE_API_URL}/items/${id}?email=${user.email}`
                );
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
                fetchItems();
            }
        });
    };

    console.log(items);
    return (
        <div>
            <Helmet>
                <title>Lost & Found | My Items</title>
            </Helmet>
            <h3 className="text-3xl">Manage my items:</h3>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>No.</label>
                                </th>
                                <th>Title</th>
                                <th>Status</th>
                                <th className="">Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {items.map((item, idx) => (
                                <tr className="items-center" key={idx}>
                                    <th>
                                        <label>{idx + 1}</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={item.Thumbnail}
                                                        alt="Avatar Tailwind CSS Component"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">
                                                    {item.Title}
                                                </div>
                                                <div className="text-sm opacity-50">
                                                    {item.Category}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p
                                            className={
                                                item.status === "pending"
                                                    ? "text-orange-600"
                                                    : "text-green-600"
                                            }
                                        >
                                            {item.status}
                                        </p>
                                    </td>
                                    <td className="">
                                        {new Date(item.Date).toLocaleString(
                                            "en-GB",
                                            {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                                hour12: true,
                                            }
                                        )}
                                    </td>
                                    <th className="flex flex-col md:flex-row gap-2">
                                        <Link to={`/update/${item._id}`}>
                                            <button className="btn bg-blue-500 w-26 text-white">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() =>
                                                handleDelete(item._id)
                                            }
                                            className="btn bg-orange-600 w-26 text-white "
                                        >
                                            Delete{" "}
                                            <MdDeleteOutline className="text-2xl" />
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageMyItem;
