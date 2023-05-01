import { useEffect, useState } from 'react';
import style from './FindLocals.module.css';
import Card from '../Card/Card';
import ReviewLocal from './ReviewLocal/ReviewLocal';
import { toast } from 'react-toastify';

const FindLocals = () => {
  const [nombre, setNombre] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const handleChange = (e) => setNombre(e.target.value);
  useEffect(() => {
    console.log('dispatch busqueda');
  }, [nombre]);

  const sendReview = () => {
    toast.success('Hemos enviado un email de verificacion', {
      position: toast.POSITION.BOTTOM_CENTER
    });
    setSelectedId(null);
  };

  return (
    <main className={style.main}>
      { selectedId && <ReviewLocal sendReview={sendReview}/>}
      <h2 className={style.title}>¿Que lugar queres reseñar?</h2>
      <div className={style.inputContainer}>
      <input placeholder="Nombre" onChange={handleChange} className={style.input}/>
      <div className={style.locals} onClick={() => setSelectedId(1)}>
        <Card id={1} Name="prueba" Rating={4} location="Buenos Aires" Images={[]} Price={1} lat={0} lng={0}/>
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
