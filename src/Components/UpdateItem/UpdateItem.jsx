import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import AuthContext from "../AuthContext/AuthContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateItem = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const [item, setItem] = useState([]);
    const navigate = useNavigate()

    const [postType, setPostType] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const fetchItem = async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}/items/id/${id}`
            );
            setItem(data);
            setPostType(data.postType);
            setCategory(data.Category);
            if (data.Date) {
              setStartDate(new Date(data.Date));
          }
  
        };
        fetchItem();
    }, [id]);
    console.log("data", item);

    const handleSubmit = (e) => {
        e.preventDefault();
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
        const UpdateItem = {
            postType,
            Thumbnail,
            Title,
            Description,
            Category,
            Location,
            Date,
            contactInfo,
            status,
        };

        axios
            .patch(`${import.meta.env.VITE_API_URL}/update/${id}`, UpdateItem)
            .then((res) => {
                if (res.data.matchedCount > 0) {
                    toast.success("Update Successful");
                    navigate("/myItems")
                }
            });
    };
    console.log(item.postType);

    return (
        <div className="card bg-base-100 w-full max-w-lg shrink-0 shadow-2xl mx-auto my-5">
            <div className="card-body">
            <h3 className="text-3xl text-center">This is Update Route</h3>
            <form onSubmit={handleSubmit}>
                <fieldset className="fieldset space-y-1">
                    <div>
                        <label className=" text-lg font-normal">
                            Select Post Type
                        </label>
                        <select
                            value={postType}
                            onChange={(e) => setPostType(e.target.value)}
                            name="postType"
                            className="select w-full"
                        >
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
                            defaultValue={item.Thumbnail}
                            name="Thumbnail"
                            className="input w-full"
                            placeholder="Thumbnail Url"
                        />
                    </div>
                    <div>
                        <label className=" text-lg font-normal">Title </label>
                        <input
                            type="text"
                            name="Title"
                            defaultValue={item.Title}
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
                            defaultValue={item.Description}
                            className="textarea w-full"
                            placeholder="Write Description"
                        ></textarea>
                    </div>
                    <div>
                        <label className=" text-lg font-normal">
                            Select Category
                        </label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="Category"
                            className="select w-full"
                        >
                            <option value="pets">pets</option>
                            <option value="gadgets"> gadgets</option>
                            <option value="documents">documents</option>
                        </select>
                    </div>
                    <div>
                        <label className=" text-lg font-normal">Location</label>
                        <input
                            type="text"
                            name="Location"
                            defaultValue={item.Location}
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
                            value={user?.email}
                            readOnly
                            name="contactInfo"
                            className="input w-full"
                            placeholder="Email"
                        />
                    </div>
                    <button className="btn btn-neutral mt-4">
                        Update Post
                    </button>
                </fieldset>
            </form>
            </div>
        </div>
    );
};

export default UpdateItem;
