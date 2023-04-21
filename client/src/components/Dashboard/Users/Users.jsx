import style from '../Dashboard.module.css';
import Paginado from '../Paginado/Paginado.jsx';
import swal from '@sweetalert/with-react';

const Users = () => {
  const users = [{
    id: 1,
    name: 'Juan',
    user: 'Juanitoelpro'
  }, {
    id: 2,
    name: 'Julian',
    user: 'Julxan'
  }, {
    id: 3,
    name: 'Edgar',
    user: 'edgarrios'
  }, {
    id: 3,
    name: 'Edgar',
    user: 'edgarrios'
  }, {
    id: 3,
    name: 'Edgar',
    user: 'edgarrios'
  }];

  const userBan = () => {
    swal('Razon de la sancion', {
      content: 'input',
      buttons: true
      // cancel:true
    })
      .then((value) => value !== null ? swal(`Razon: ${value}`) : '');
  };

  const setRank = (e) => {
    console.log(e.target.name);
    swal({
      title: `¿Estas seguro que deseas que ${e.target.name} sea ${e.target.value}?`,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then((willDelete) => {
        if (willDelete) {
          swal(`${e.target.name} ahora es ${e.target.value}`, {
            icon: 'success'
          });
        }
      });
  };

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>Usuarios</h2>
        <input placeholder="Buscar usuario" className={style.buscador}></input>
        <div className={style.containerUserCard}>
            {
                users.map(u => <>
        <div className={style.userCard}>
            <img className={style.userIcon} src="https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo-180x180.jpg?resize=180%2C180"></img>
            <div className={style.nameAndUser}>
            <p className={style.name}>{u.name}</p>
            <p className={style.usernames}>@{u.user}</p>
            </div>
            <select className={style.role} name={u.name} onChange={setRank}>
                <option selected value="User">USER</option>
                <option value="Owner">OWNER</option>
                <option value="Admin">ADMIN</option>
            </select>
            <button className={style.banButton} onClick={userBan}>Sancionar</button>
        </div>
        </>
                )}
        </div>
        <Paginado/>
    </div>
  );
};

export default Users;
