import axios from "axios";
import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import AuthContext from "../AuthContext/AuthContext";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const LostAndFound = () => {
    const {user} = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const navigate = useNavigate()
    const axiosSecure = useAxiosSecure()

    

    const handleSubmit = e => {
      e.preventDefault()
      const form = e.target;
      const postType = form.postType.value;
      const Thumbnail = form.Thumbnail.value;
      const Title = form.Title.value;
      const Description = form.Description.value;
      const Category = form.Category.value;
      const Location = form.Location.value;
      const Date = startDate;
      const contactInfo = form.contactInfo.value;
      const status = "pending";
      const item = {
        postType,Thumbnail,Title,Description,Category,Location,Date,contactInfo,status
      }

     axiosSecure.post(`${import.meta.env.VITE_API_URL}/items?email=${user.email}`,item)
    .then(res =>{
        if(res.data.acknowledged){
            toast.success('Post Added Successful')
            navigate('/myItems')
        }
    })

    }


    return (
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto my-5">
             <Helmet>
                            <title>Lost & Found | Add</title>
                        </Helmet>
            <div className="card-body">
                <h4 className="mx-auto text-2xl font-semibold">
                    Add Lost & Found Item
                </h4>
                <form onSubmit={handleSubmit}>
                <fieldset className="fieldset space-y-1">
                    <div>
                        <label className=" text-lg font-normal">
                            Select Post Type
                        </label>
                        <select defaultValue="Pick a color" name="postType" className="select w-full">
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>
                    </div>
                    <div>
                        <label className=" text-lg font-normal">
                            Thumbnail{" "}
                        </label>
                        <input
                            type="text"
                            name="Thumbnail"
                            className="input w-full"
                            placeholder="Thumbnail Url"
                        />
                    </div>
                    <div>
                        <label className=" text-lg font-normal">
                            Title{" "}
                        </label>
                        <input
                            type="text"
                            name="Title"
                            className="input w-full"
                            placeholder="Title"
                        />
                    </div>
                    <div>
                        <label className=" text-lg font-normal">
                            Description{" "}
                        </label>
                        <textarea
                            name="Description"
                            className="textarea w-full"
                            placeholder="Write Description"
                        ></textarea>
                    </div>
                    <div>
                        <label className=" text-lg font-normal">
                            Select Category
                        </label>
                        <select defaultValue="" name="Category" className="select w-full">
                            <option value="pets">pets</option>
                            <option value="gadgets"> gadgets</option>
                            <option value="documents">documents</option>
                        </select>
                    </div>
                    <div>
                        <label className=" text-lg font-normal">
                            Location
                        </label>
                        <input
                            type="text"
                            name="Location"
                            className="input w-full"
                            placeholder="Location"
                        />
                    </div>
                    <div className="">
                        <label className=" text-lg font-normal">
                            Lost/Found Date
                        </label>
                        <DatePicker
                            className="input input-bordered w-full"
                            selected={startDate}
                            wrapperClassName="w-full" 
                            onChange={(date) => setStartDate(date)}
                        />
                    </div>
                    <div>
                        <label className=" text-lg font-normal">
                            Contact Information
                        </label>
                        <input
                            type="text"
                            value={user.email}
                            readOnly
                            name="contactInfo"
                            className="input w-full"
                            placeholder="Email"
                        />
                    </div>
                    <button className="btn btn-neutral mt-4">Add Post</button>
                </fieldset>
                </form>
            </div>
        </div>
    );
};

export default LostAndFound;
