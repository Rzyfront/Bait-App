import { useEffect, useState } from 'react';
import style from './Users.module.css';
import Pagination from '../Pagination/Pagination';
// import swal from '@sweetalert/with-react';
import { getAllUsers } from '../../../redux/actions/admin';
import { useDispatch, useSelector } from 'react-redux';
import User from './User';
import { ToastContainer } from 'react-toastify';

const Users = ({ localId, handleAdd }) => {
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
    setFilter({
      ...filter,
      page: e
    });
  };
  const handleData = (e) => {
    const { name, value } = e.target;
    setFilter({
      ...filter,
      [name]: value,
      page: 1
    });
  };
  const handleSelect = (e) => {
    setFilter({
      ...filter,
      role: e.target.value,
      page: 1
    });
  };

  return (
    <div className={style.container}>
      <header className={style.header}>
          <h2 className={style.nameSection}>Usuarios</h2>
          <article className={style.filters}>
            <select
              onChange={handleSelect}
              value={filter.role}
              defaultValue=''
              className={style.select}
            >
              <option value='' disabled selected>Seleccionar rol</option>
              <option value='' >Todos</option>
              <option value='user' >Usuario</option>
              <option value='owner' >Propietario</option>
              <option value='admin' >Administrador</option>
              <option value='superAdmin' >Súper admin</option>
            </select >
            <input placeholder='Email' name='email' value={filter.email} className={style.input} onChange={handleData}></input>
        </article>
      </header>
      <main className={style.tableResponsive}>
        <table className={style.table}>
          <thead>
            <tr>
              <th></th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Celular</th>
              <th colSpan={2}>Rol</th>
              <th colSpan={2}>Estado</th>
              <th colSpan={2}>Acciones</th>
            </tr>
          </thead>
          <tbody>
          {data.users &&
            data.users.map((data, index) => {
              return <User id={data.id} lastname={data.lastname} age={data.age} role={data.role} key={index} image={data.Image} name={data.name} email={data.email} filter={filter} localId={localId} handleAdd={handleAdd} verified={data.verified}
              phone_number={data.phone_number} />;
            })
          }
          </tbody>
        </table>
        <Pagination paginade={paginade} page={filter.page} totalPages={data.totalPages} />
        <ToastContainer />
      </main>

    </div>
  );
};

export default Users;
