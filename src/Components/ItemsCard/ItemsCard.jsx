import React from "react";

const ItemsCard = ({item}) => {
    console.log(item)
    const {postType,Thumbnail,Title,Description,Category,Location,Date,contactInfo,_id} = item;
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
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
                        <button className="btn btn-primary">See Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ItemsCard;
