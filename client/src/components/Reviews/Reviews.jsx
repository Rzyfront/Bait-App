import React from "react";
import "./Reviews.css";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function Reviews({ ReviewsList }) {
  return (
    <div className="Reviews">
      <div className="TitleGroup">
        <h2 className="Reviews-Title">Reviews</h2>
        <div className="Decorator"></div>
      </div>
      <div className="Reviews-List">
        {ReviewsList.map(({ User, Rating, Images, Opinion }, index) => {
          return (
            <div key={index} className="ReviewCard">
              <div className="LeftInfo">
                <h3>{User}</h3>
                <div className="RatingGroup">
                  <h4>Rating:</h4>
                  <RatingStar
                    readOnly
                    style={{ maxWidth: 100 }}
                    rating={Rating}
                  />
                </div>
                <div className="OpinionGroup">
                  <h4>Opinion:</h4>
                  <p>{Opinion}</p>
                </div>
              </div>
              <div className="RigthImg">
                <img src={Images[0]} alt="default" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Reviews;
