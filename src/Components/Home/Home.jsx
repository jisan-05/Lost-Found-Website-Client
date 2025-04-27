import React, { useContext, useEffect, useState } from "react";
import Slider from "../Slider/Slider";
import axios from "axios";
import ItemsCard from "../ItemsCard/ItemsCard";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AuthContext from "../AuthContext/AuthContext";
import { useLoaderData } from "react-router-dom";
import "./Home.css";

const Home = () => {
    const [items, setItems] = useState([]);
    // const axiosSecure = useAxiosSecure()
    // const {user} =useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const [itemPerPage, setItemPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const { count } = useLoaderData();

    const numberOfPages = Math.ceil(count / itemPerPage);

    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i);
    }

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/items?page=${currentPage}&size=${itemPerPage}`
                );
                setItems(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, [currentPage, itemPerPage]);

    // console.log(items);
    const handlePerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemPerPage(val);
        setCurrentPage(0);
    };
    const handlePrevPage = () =>{
        if(currentPage > 0){
            setCurrentPage(currentPage - 1)
        }
    }
    const handleNextPage = () =>{
        if(currentPage < pages.length - 1){
            setCurrentPage(currentPage + 1)
        }
    }

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
            {/* for pagination  */}
            <div className="pagination">
                <button className="btn" onClick={handlePrevPage}>Prev</button>
                {pages.map((page) => (
                    <button
                        className={`btn ${currentPage === page && "selected"}`}
                        key={page}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button className="btn" onClick={handleNextPage}>Next</button>
                <select
                    value={itemPerPage}
                    name=""
                    id=""
                    onChange={handlePerPage}
                    className="btn"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        </div>
    );
};

export default Home;
