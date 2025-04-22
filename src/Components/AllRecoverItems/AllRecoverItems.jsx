import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../AuthContext/AuthContext";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const AllRecoverItems = () => {
    const { user } = useContext(AuthContext);
    const [recoverItems, setRecoverItems] = useState([]);
    const [recoveredBy, setRecoveredBy] = useState([])

    const fetchItems = async () => {
        const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/allRecovered/${user.email}`
        );
        setRecoverItems(data);
    };
    useEffect(() => {
        fetchItems();
    }, []);
    console.log(recoverItems);

    return (
        <div>
             <Helmet>
                            <title>Lost & Found | Recover</title>
                        </Helmet>
            All recover items:
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>No.</label>
                                </th>
                                <th>Recover Item Id </th>
                                <th>Location</th>
                                <th>Recover Date</th>
                                <th>Who Recovered</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {recoverItems.map((recoverItem, idx) => (
                                <tr className="items-center" key={idx}>
                                    <th>
                                        <label>{idx + 1}</label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="">
                                                <div className="">
                                                {recoverItem.RecoveredItemId}
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </td>
                                    <td>
                                        <div>{recoverItem.location}</div>
                                    </td>
                                    <td>
                                        {new Date(
                                            recoverItem.recoveredDate
                                        ).toLocaleString("en-GB", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </td>
                                    <th className="flex gap-2">
                                        <button className="">
                                           Email : {recoverItem.recoveredBy.email}
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

export default AllRecoverItems;
