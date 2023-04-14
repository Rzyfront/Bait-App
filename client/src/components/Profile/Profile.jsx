import React from "react";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { GoLocation } from "react-icons/go";
import img from "../../assets/restaurante.jpg";
import imgComida from "../../assets/comida.jpg";
import Rimg from "../../assets/Reviewphoto.jpg";
import "./Profile.css";
import Menu from "../Menu/Menu";
import Reviews from "../Reviews/Reviews";
import { BsCalendar3 } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { TfiPencilAlt } from "react-icons/tfi";
import { GiMeal } from "react-icons/gi";

function Profile() {
  const ListMenu = [
    { Name: "Pollo Teriyaky", Price: 200, Image: imgComida, Rating: 3 },
    { Name: "Milanesa", Price: 400, Image: imgComida, Rating: 3 },
    { Name: "Lomo asado", Price: 600, Image: imgComida, Rating: 3 },
    { Name: "Pasta italiana", Price: 150, Image: imgComida, Rating: 3 },
    { Name: "Pollo Teriyaky", Price: 200, Image: imgComida, Rating: 3 },
    { Name: "Milanesa", Price: 400, Image: imgComida, Rating: 3 },
    { Name: "Lomo asado", Price: 600, Image: imgComida, Rating: 3 },
    { Name: "Pasta italiana", Price: 150, Image: imgComida, Rating: 3 },
  ];

  const ReviewsList = [
    {
      User: "Rafael Martinez",
      Rating: 1,
      Images: [Rimg],
      Opinion:
        "Esas papas estabas mas cauchudas que un neumatico te tractomula, y la carne mas dura un bloque de cemento reforzado con acero de una tonelada y media.",
    },
    {
      User: "Rafael Martinez",
      Rating: 1,
      Images: [Rimg],
      Opinion:
        "Esas papas estabas mas cauchudas que un neumatico te tractomula, y la carne mas dura un bloque de cemento reforzado con acero de una tonelada y media.",
    },
    {
      User: "Rafael Martinez",
      Rating: 1,
      Images: [Rimg],
      Opinion:
        "Esas papas estabas mas cauchudas que un neumatico te tractomula, y la carne mas dura un bloque de cemento reforzado con acero de una tonelada y media.",
    },
    {
      User: "Rafael Martinez",
      Rating: 1,
      Images: [Rimg],
      Opinion:
        "Esas papas estabas mas cauchudas que un neumatico te tractomula, y la carne mas dura un bloque de cemento reforzado con acero de una tonelada y media.",
    },
    {
      User: "Rafael Martinez",
      Rating: 1,
      Images: [Rimg],
      Opinion:
        "Esas papas estabas mas cauchudas que un neumatico te tractomula, y la carne mas dura un bloque de cemento reforzado con acero de una tonelada y media.",
    },
    {
      User: "Rafael Martinez",
      Rating: 1,
      Images: [Rimg],
      Opinion:
        "Esas papas estabas mas cauchudas que un neumatico te tractomula, y la carne mas dura un bloque de cemento reforzado con acero de una tonelada y media.",
    },
  ];

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
        <div className="Decorator"></div>
        <div className="Info">
          <h2>{Name}</h2>
          <div className="RatingGroup">
            <h3>Rating:</h3>
            <RatingStar readOnly style={{ maxWidth: 100 }} value={Rating} />
          </div>
          <div className="LocationGroup">
            <h3 className="Location">{Location}</h3>
            <GoLocation />
          </div>
          <div className="ScheduleGroup">
            <h3>Horario:</h3>
            <p className="Schedule">{Schedule}</p>
          </div>
          <div className="TelGroup">
            <h3>Tel:</h3>
            {Tel.map((t, i) => {
              return <p key={i}>{t} |</p>;
            })}
          </div>
          <div className="EmailGroup">
            <h3>E-mail:</h3>
            <p>{Email}</p>
          </div>
          <div className="Options">
            <div className="Reservar">
              <p>Reservar</p>
              <BsCalendar3 />
            </div>
            <div className="VerReseña">
              <p>Ver Reseñas</p>
              <TfiCommentAlt />
            </div>
            <div className="HacerReseña">
              <p>Hacer Reseña</p>
              <TfiPencilAlt />
            </div>
            <div className="VerMenu">
              <p>Ver Menu</p>
              <GiMeal />
            </div>
          </div>
          <div></div>
        </div>
      </div>
      <div className="ContainerSelection">
        {/* <Menu ListMenu={ListMenu} /> */}
        <Reviews ReviewsList={ReviewsList} />
      </div>
    </div>
  );
}

export default Profile;
