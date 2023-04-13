import { useState } from "react";
import "./Landing.css"

const Landing = () => {

    const [x, setX] = useState(true)

  return(
    <>
    { x ?
    <>
      <h3 className="title">¿Que quieres comer hoy?</h3>
      <div className="container">
        <div onClick={() => setX(!x)} className="icon-container">
            <img className="icon" src="./img/icons/sushi.png"/>
            <p className="text-icon">SUSHI</p>
        </div>
        <div onClick={() => setX(!x)} className="icon-container">
            <img className="icon" src="./img/icons/meat.png"/>
            <p className="text-icon">MEAT</p>
        </div>
        <div onClick={() => setX(!x)} className="icon-container">
            <img className="icon" src="./img/icons/fish.png"/>
            <p className="text-icon">FISH</p>
        </div>
        <div onClick={() => setX(!x)} className="icon-container">
            <img className="icon" src="./img/icons/soup.png"/>
            <p className="text-icon">SOUP</p>
        </div>
        <div onClick={() => setX(!x)} className="icon-container">
            <img className="icon" src="./img/icons/pizza.png"/>
            <p className="text-icon">PIZZA</p>
        </div>
      </div>
      <p className="saltar" onClick={() => setX(!x)}>Aun no lo se</p>
      </> :
      <>
      <h2 className="title">¿Donde estas?</h2>
      <div className="select-container">
      <select name="select" className="select" onChange={() => alert("Change")}>
    <option value="value2" selected>Selecciona</option>
  <option value="value1">Cordoba</option>
  <option value="value2">Buenos Aires</option>
  <option value="value3">Corrientes</option>
</select>
</div>
      <p className="saltar" onClick={() => setX(!x)}>Prefiero no decirlo</p>
      </>}
    </>
  )
};

export default Landing