import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./Cards.css";
import { useSelector } from "react-redux";
import Pagination from "../pagination/pagination";
//Temporal IMG!!!!
import img from "../../assets/restaurante.jpg";

function Cards() {
  //controller navegation
  const [navegation, setnavegation] = useState(0);
  //carts data
  const ContainerCards = useSelector((state) => state.cards);
  //reset filters or search
  useEffect(() => {
    setnavegation(0);
  }, [ContainerCards]);

  const handlepage = (data) => {
    setnavegation(data);
  };

  return (
    <div className="containerCardsall">
      <div className="ContainerCards">
        {ContainerCards.length > 0 ? (
          ContainerCards[navegation].map(
            (
              {
                name,
                rating,
                location,
                verified,
                schedule,
                id,
                Characteristic,
                Images,
              },
              index
            ) => {
              return (
                <Link to="/profile" key={index}>
                  <Card
                    id={id}
                    Name={name}
                    Rating={rating}
                    location={location}
                    verified={verified}
                    schedule={schedule}
                    Characteristic={Characteristic}
                    Images={img}
                  />
                </Link>
              );
            }
          )
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/6195/6195678.png"
            alt="noImage"
          />
        )}
      </div>
      {ContainerCards.length === 0 ? (
        <div></div>
      ) : (
        <Pagination
          length_data={ContainerCards.length}
          position={navegation}
          handlepage={handlepage}
        />
      )}
    </div>
  );
}

export default Cards;
