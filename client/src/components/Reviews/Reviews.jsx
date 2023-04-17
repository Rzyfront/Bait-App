import React, { useEffect } from "react";
import "./Reviews.css";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function Reviews({ ReviewsList }) {
  useEffect(() => {
    console.log(ReviewsList);
  }, []);
  return (
    <div className="Reviews">
      <div className="TitleGroup">
        <h2 className="Reviews-Title">Reviews</h2>
        <div className="Decorator"></div>
      </div>
      <div className="Reviews-List">
        {ReviewsList.map(({ User, rating, Images, comment, title }, index) => {
          return (
            <div key={index} className="ReviewCard">
              <div className="LeftInfo">
                <h3>{title}</h3>
                <div className="RatingGroup">
                  <h4>Rating:</h4>
                  <RatingStar
                    readOnly
                    style={{ maxWidth: 100 }}
                    value={rating}
                  />
                </div>
                <div className="OpinionGroup">
                  <h4>Opinion:</h4>
                  <p>{comment}</p>
                </div>
              </div>
              <div className="RigthImg">
                <img
                  src={
                    "https://i.pinimg.com/474x/d9/6a/1d/d96a1d3e6315ed8e92c892fdd769f9b1.jpg"
                  }
                  alt="default"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
