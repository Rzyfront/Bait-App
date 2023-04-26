import { useEffect, useState } from 'react';
import style from '../Dashboard.module.css';
import Paginado from '../Paginado/Paginado.jsx';
// import swal from '@sweetalert/with-react';
import { getAllUsers } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import User from './User';
import { ToastContainer } from 'react-toastify';
const Users = () => {
  const data = useSelector((state) => state.users);

  const [filter, setFilter] = useState({
    page: 1,
    role: '',
    email: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (filter) {
      console.log('hola');
      dispatch(getAllUsers(filter));
    }
  }, []);
  console.log(data);
  return (
    <div className={style.options}>
      <h2 className={style.nameSection}>Usuarios</h2>
      <input placeholder="Buscar usuario" className={style.buscador}></input>
      <div className={style.containerUserCard}>

        {data && data.users &&
           data.users.map((data, index) => {
             return <User id={data.id} lastname={data.lastname} age={data.age} role={data.role} key={index} image={data.image} name={data.name} />;
           })
          }
      </div>
      <ToastContainer/>
      <Paginado />
    </div>
  );
};

export default Users;
