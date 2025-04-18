import React from "react";
import { Link } from "react-router-dom";

const ItemsCard = ({item}) => {
    // console.log(item)
    const {postType,Thumbnail,Title,Description,Category,Location,Date,contactInfo,_id} = item;

    

    return (
        <div>
            <div className="card w-96 shadow-sm p-4 md:p-5 bg-blue-200">
                <figure>
                    <img
                        className="h-44 w-full object-cover"
                        src={Thumbnail}
                        alt="Shoes"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{Title}</h2>
                    <p>
                        {Description.slice(0,80)} .....
                    </p>
                    <div className="card-actions justify-end">
                        <Link to={`/items/${_id}`}><button className="btn btn-primary">See Details</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsCard;
