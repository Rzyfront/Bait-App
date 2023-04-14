import React from "react";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { GoLocation } from "react-icons/go";
import img from "../../assets/restaurante.jpg";
import "./Profile.css";

function Profile() {
  const { Name, Image, Rating, Location, Schedule, Tel, Email } = {
    Name: "La Grandeza",
    Image: img,
    Rating: 3.8,
    Location: "Cordoba",
    Schedule: "8am-12pm",
    Tel: [123214352, 453424324],
    Email: "sdasdasda@grupo5pf.com",
  };
  return (
    <div className="Profile">
      <div className="ProfileInfo">
        <img src={Image} alt={Name} className="ImageProfile" />
        <div className="Info">
          <div className="Decorator"></div>
          <h2>{Name}</h2>
          <div className="RatingGroup">
            <p>Rating:</p>
            <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating} />
          </div>
          <div className="LocationGroup">
            <p className="Location">{Location}</p>
            <GoLocation />
          </div>
          <div className="ScheduleGroup">
            <p>Horario:</p>
            <p className="Schedule">{Schedule}</p>
          </div>
          <div className="TelGroup">
            <p>Tel:</p>
            {Tel.map((t, i) => {
              return <p key={i}>{t}</p>;
            })}
          </div>
          <div className="EmailGroup">
            <p>E-mail:</p>
            <p>{Email}</p>
          </div>
          <div>
            <p>Reservar</p>
          </div>
          <div></div>
        </div>
      </div>
      <div className="ContainerSelection"></div>
    </div>
  );
}

export default Profile;
