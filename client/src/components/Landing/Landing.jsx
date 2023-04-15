import { useState } from "react";
import { Navbar } from "../components";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  // const [x, setX] = useState(true);

  return (
    <div className="Landing">
      <h2>Landing en construccion</h2>
      <h3>Vuelve Pronto</h3>
      <Link to="/home">
        <button>Ir a Home</button>
      </Link>
      {/* {x ? (
        <div className="QueComer">
          <h2>Bienvenido</h2>
          <h3 className="title">¿Que quieres comer hoy?</h3>
          <div className="container">
            <div onClick={() => setX(!x)} className="icon-container">
              <img className="icon" src="./img/icons/sushi.png" />
              <p className="text-icon">SUSHI</p>
            </div>
            <div onClick={() => setX(!x)} className="icon-container">
              <img className="icon" src="./img/icons/meat.png" />
              <p className="text-icon">MEAT</p>
            </div>
            <div onClick={() => setX(!x)} className="icon-container">
              <img className="icon" src="./img/icons/fish.png" />
              <p className="text-icon">FISH</p>
            </div>
            <div onClick={() => setX(!x)} className="icon-container">
              <img className="icon" src="./img/icons/soup.png" />
              <p className="text-icon">SOUP</p>
            </div>
            <div onClick={() => setX(!x)} className="icon-container">
              <img className="icon" src="./img/icons/pizza.png" />
              <p className="text-icon">PIZZA</p>
            </div>
          </div>
          <p className="saltar" onClick={() => setX(!x)}>
            Aun no lo se
          </p>
        </div>
      ) : (
        <div className="DondeComer">
          <h2 className="title">¿Donde estas?</h2>
          <div className="select-container">
            <select
              name="select"
              className="select"
              onChange={() => alert("Change")}
            >
              <option value="value2" selected>
                Selecciona
              </option>
              <option value="value1">Cordoba</option>
              <option value="value2">Buenos Aires</option>
              <option value="value3">Corrientes</option>
            </select>
          </div>
          <Link to="/home">
            <p className="saltar" onClick={() => setX(!x)}>
              Prefiero no decirlo
            </p>
          </Link>
        </div>
      )} */}
    </div>
  );
};

export default Landing;
