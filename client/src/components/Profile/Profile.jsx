import React, { useEffect } from "react";
import { Rating as RatingStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { GoLocation } from "react-icons/go";
import { BsCalendar3 } from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { TfiPencilAlt } from "react-icons/tfi";
import { GiMeal } from "react-icons/gi";
import img from "../../assets/restaurante.jpg";
import imgComida from "../../assets/comida.jpg";
import Rimg from "../../assets/Reviewphoto.jpg";
import { Menu, Navbar, Reviews, ReviewsForm } from "../components";
import { useState } from "react";
import "./Profile.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailLocal } from "../../redux/actions/actions";

function Profile() {
  const [average, setAverage] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { locals } = useSelector((state) => state.detail);

  let { id } = useParams();
  useEffect(() => {
    dispatch(DetailLocal(id));
  }, [id]);

  useEffect(() => {
    if (locals) {
      let suma = 0;
      locals.Reviews.forEach((data) => {
        suma += data.rating;
      });
      suma = suma / locals.Reviews.length;
      setAverage(suma);
      if (locals.Reviews.length === 0) {
        setAverage(0);
      }
    }
  }, [locals]);

  const [toogleModal, setToggleModal] = useState("ReviewsLocal");
  const [toogleModal2, setToggleModal2] = useState(false);
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
    Tel: [123214352, 453424324],
  };
  return (
    <>
      <Navbar />
      <div className="Profile">
        {toogleModal2 && <ReviewsForm setToggleModal2={setToggleModal2} />}
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
              <p className="Schedule">{locals.schedule}</p>
            </div>
            <div className="TelGroup">
              <h3>Tel:</h3>
              {Tel.map((t, i) => {
                return <p key={i}>{t} |</p>;
              })}
            </div>
            <div className="EmailGroup">
              <h3>E-mail:</h3>
              <p>{locals.email}</p>
            </div>
            <div className="Options">
              <div className="Reservar">
                <p>Reservar</p>
                <BsCalendar3 />
              </div>
              <div
                className="VerReseña"
                onClick={() => {
                  setToggleModal("ReviewsLocal");
                }}
              >
                <p>Ver Reseñas</p>
                <TfiCommentAlt />
              </div>
              <div
                className="HacerReseña"
                onClick={
                  toogleModal2
                    ? () => {
                        setToggleModal2(false);
                      }
                    : () => {
                        setToggleModal2(true);
                      }
                }
              >
                <p>Hacer Reseña</p>
                <TfiPencilAlt />
              </div>
              <div
                className="VerMenu"
                onClick={() => {
                  setToggleModal("Menu");
                }}
              >
                <p>Ver Menu</p>
                <GiMeal />
              </div>
            </div>
          </div>
        </div>

        <div className="ContainerSelection">
          {(toogleModal === "Menu" || !toogleModal) && (
            <Menu ListMenu={ListMenu} />
          )}
          {locals && toogleModal === "ReviewsLocal" && (
            <ReviewsLocal ReviewsList={locals.Reviews} />
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
