import React from "react";
import { GoLocation } from "react-icons/go";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import img from "../../assets/restaurante.jpg";
import "./Card.css";

function Card({ Location, Rating, Name }) {
  return (
    <div className="Card">
      <img src={img} alt="restaurante" className="imgCard" />
      <div className="infoCard">
        <h2 className="placeName">{Name || "No name"}</h2>
        <div className="RatingGroup">
          <p className="Rating">Rating: </p>
          <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating} />
        </div>
        <div className="LocationGroup">
          <p className="Location">{Location || "No location"}</p>
          <GoLocation />
        </div>
      </div>
    </div>
  );
}

export default Card;
