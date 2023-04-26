import { useDispatch, useSelector } from 'react-redux';
import style from '../Dashboard.module.css';
import Paginado from '../Paginado/Paginado';
import { getAllReviews } from '../../../redux/actions/admin';
import { useEffect, useState } from 'react';

// import Reseña from './Reseña';
const Reseñas = ({ fn }) => {
  // data
  const dispatch = useDispatch();
  const data = useSelector((state) => state.users);
  // states controllers
  const [verifiet, setVerifiet] = useState('unVerified');
  const [page, setPage] = useState('1');

  // loading reviuws
  useEffect(() => {
    dispatch(getAllReviews(1, 'unVerified'));
  }, []);
  console.log(data);
  // const reseñas = [{
  //   id: 1,
  //   local: 'La taberna de Rodri',
  //   name: 'Edgar Vilchez',
  //   title: 'Pesimo servicio',
  //   stars: '2'
  // }, {
  //   id: 1,
  //   local: 'K1LO',
  //   name: 'Juan Vargas',
  //   title: 'Probando...',
  //   stars: '4'
  // }, {
  //   id: 1,
  //   local: 'Amanecer Llanero',
  //   name: 'Yubirizaida',
  //   title: 'Excelente lugar',
  //   stars: '5'
  // }, {
  //   id: 1,
  //   local: 'Starbucks',
  //   name: 'Edgar Vilchez',
  //   title: 'Muy caro',
  //   stars: '1'
  // }, {
  //   id: 1,
  //   local: 'Doña Claudia',
  //   name: 'Franco Gutierrez',
  //   title: 'Comida con pelos',
  //   stars: '1'
  // }];

  return (
    <div className={style.options}>
        {/* <h2 className={style.nameSection}>Reseñas</h2>
        <div className={style.containerUserCard}> */}
{/*
        </div>
        <Paginado/> */}
    </div>
  );
};

export default Reseñas;
