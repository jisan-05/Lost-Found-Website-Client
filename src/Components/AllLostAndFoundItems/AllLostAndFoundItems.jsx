import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import ItemsCard from "../ItemsCard/ItemsCard";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import AuthContext from "../AuthContext/AuthContext";
import { useLoaderData } from "react-router-dom";
import "./AllLostAndFountItems.css";

const AllLostAndFoundItems = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState("");
    const [search, setSearch] = useState("");
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const { count } = useLoaderData();
    console.log(count);

    const numberOfPages = Math.ceil(count / itemsPerPage);

    const pages = [];
    for (let i = 0; i < numberOfPages; i++) {
        pages.push(i);
    }
    console.log(pages);

    /**
     * DONE 1 : get the total number of products
     * TODO 2 : number of items per page Dynamic
     * TODO 3 : set current page
     */

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const { data } = await axios.get(
                    `${
                        import.meta.env.VITE_API_URL
                    }/all-items?filter=${filter}&search=${search}&page=${currentPage}&size=${itemsPerPage}`
                );
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, [filter, search,currentPage,itemsPerPage]);
    // console.log(items);
    console.log(filter);
    const handleReset = () => {
        setFilter("");
        setSearch("");
    };

    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
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
                <title>Lost & Found | ALL</title>
            </Helmet>
            {/* For Search Filter  */}
            <div className="mt-14 mb-8 flex justify-center gap-4 ">
                <div>
                    <select
                        name="Category"
                        className="select w-full"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">Filter by category</option>
                        <option value="pets">pets</option>
                        <option value="gadgets"> gadgets</option>
                        <option value="documents">documents</option>
                    </select>
                </div>

                <div className="flex gap-1">
                    <input
                        type="text"
                        placeholder="Enter Title"
                        className="input font-bold"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="btn bg-blue-600 text-white">
                        Search
                    </button>
                </div>
                <div>
                    <button
                        className="btn bg-gray-700 text-white"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
            {/* ----------------end------------------ */}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-5">
                {items.map((item, idx) => (
                    <ItemsCard key={idx} item={item}></ItemsCard>
                ))}
            </div>
            <div className="pagination">
                <p>Current Page : {currentPage}</p>
                <button className="btn" onClick={handlePrevPage}>Prev</button>
                {pages.map((page) => (
                    <button
                        className={`btn ${currentPage === page && "selected"}`}
                        onClick={() => setCurrentPage(page)}
                        key={page}
                    >
                        {page}
                    </button>
                ))}
                <button onClick={handleNextPage} className="btn">Next</button>

                <select
                    name=""
                    id=""
                    value={itemsPerPage}
                    onChange={handleItemsPerPage}
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

export default AllLostAndFoundItems;
