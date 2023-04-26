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
      dispatch(getAllUsers(filter));
    }
  }, [filter || undefined]);

  const paginade = (e) => {
    console.log(e);
    setFilter({
      ...filter,
      page: e
    });
  };
  const handleData = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value
    });
  };
  const handleSelect = (e) => {
    setFilter({
      ...filter,
      role: e.target.value
    });
  };

  return (
    <div className={style.options}>
      <h2 className={style.nameSection}>Usuarios</h2>
      <select
        onChange={handleSelect}
        value={filter.role}
        defaultValue=""
      >
        <option value="" disabled selected>Seleccionar rol</option>
        <option value="" >all</option>
       <option value="user" >user</option>
       <option value="owner" >owner</option>
        <option value="admin" >admin</option>
        <option value="superAdmin" >superAdmin</option>
      </select >
      <input placeholder="email" name="email" value={filter.email} className={style.buscador} onChange={handleData}></input>
      <div className={style.containerUserCard}>

        {data && data.users &&
           data.users.map((data, index) => {
             return <User id={data.id} lastname={data.lastname} age={data.age} role={data.role} key={index} image={data.image} name={data.name} />;
           })
          }
        <Paginado paginade={paginade} />
        <ToastContainer />
      </div>

    </div>
  );
};

export default Users;
