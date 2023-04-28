import { useState } from 'react';
import style from './FindLocals.module.css';
import Card from '../Card/Card';
import { Link } from 'react-router-dom';

const FindLocals = () => {
  const [nombre, setNombre] = useState();
  const handleChange = (e) => setNombre(e.target.value);
  return (
    <main className={style.main}>
      <h2 className={style.title}>¿Que lugar queres reseñar?</h2>
      <div className={style.inputContainer}>
      <input placeholder="Nombre" onChange={handleChange} className={style.input}/>
      <div className={style.locals}>
        <Link to="/reviewLocal"><Card id={1} Name="prueba" Rating={4} location="Buenos Aires" Images={[]} Price={1} lat={0} lng={0}/></Link>
        <Card id={1} Name="prueba" Rating={4} location="Buenos Aires" Images={[]} Price={1} lat={0} lng={0}/>
        <Card id={1} Name="prueba" Rating={4} location="Buenos Aires" Images={[]} Price={1} lat={0} lng={0}/>
        <Card id={1} Name="prueba" Rating={4} location="Buenos Aires" Images={[]} Price={1} lat={0} lng={0}/>
        <Card id={1} Name="prueba" Rating={4} location="Buenos Aires" Images={[]} Price={1} lat={0} lng={0}/>
      </div>
      </div>
    </main>
  );
};

export default FindLocals;
