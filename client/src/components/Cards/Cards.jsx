import React, { useEffect, useState } from "react";
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
        {ContainerCards[navegation].map(({ Name, Rating, Location }, index) => {
          return (
            <Card
              Name={Name}
              Rating={Rating}
              Location={Location}
              Image={img}
              key={index}
            />
          );
        })}
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
