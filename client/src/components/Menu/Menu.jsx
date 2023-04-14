import React from "react";
import "./Menu.css";
import Card from "../Card/Card";

function Menu({ ListMenu }) {
  return (
    <div className="Menu">
      <div className="TitleGroup">
        <h2 className="Menu-Title">Menu</h2>
        <div className="Decorator"></div>
      </div>
      <div className="Menu-List">
        {ListMenu.map(({ Name, Image, Price, Rating }, index) => {
          return (
            <Card
              key={index}
              Name={Name}
              Image={Image}
              Price={Price}
              Rating={Rating}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Menu;
