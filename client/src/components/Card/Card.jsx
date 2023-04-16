import React from "react";
import { GoLocation } from "react-icons/go";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./Card.css";

function Card({
  id,
  Name,
  Rating,
  location,
  verified,
  schedule,
  Characteristic,
  Images,
}) {
  return (
    <div className="Card">
      <img src={Images} alt={Name} className="imgCard" />
      <div className="infoCard">
        <h2 className="placeName">{Name || "No name"}</h2>
        {Rating && (
          <div className="RatingGroup">
            <p className="Rating">Rating: </p>
            <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating} />
          </div>
        )}
        {Location && (
          <div className="LocationGroup">
            <p className="Location">{Location}</p>
            <GoLocation />
          </div>
        )}
        {/* {Price && <p className="Price">${Price}</p>} */}
      </div>
    </div>
  );
}

export default Card;
