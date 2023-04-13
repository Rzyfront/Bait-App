import React from "react";
import Card from "../Card/Card";
function Cards() {
  const SoyUnaBaseDeDatos = [
    { Name: "Mc Donalls", Location: "Buenos Aires", Rating: 4.2 },
    { Name: "BurgerKing", Location: "Buenos Aires", Rating: 4.3 },
    { Name: "Milanesas jons", Location: "Buenos Aires", Rating: 4.8 },
    { Name: "Asados El boludo", Location: "Santafe", Rating: 5 },
    { Name: "Boldmaunt", Location: "Buenos Aires", Rating: 3.2 },
    { Name: "La esquida del sabor", Location: "Buenos Aires", Rating: 2.1 },
  ];
  return (
    <div className="ContainerCards">
      {SoyUnaBaseDeDatos.map(({ Name, Rating, Location }) => {
        return <Card Name={Name} Rating={Rating} Location={Location} />;
      })}
    </div>
  );
}

export default Cards;
