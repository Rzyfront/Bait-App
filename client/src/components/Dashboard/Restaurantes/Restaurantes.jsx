import style from '../Dashboard.module.css';
import Paginado from '../Paginado/Paginado';
// import swal from '@sweetalert/with-react';

const Restaurantes = () => {
  const locales = [{
    id: 1,
    name: 'La taberna de Rodri',
    user: 'Verificado'
  }, {
    id: 2,
    name: 'La cabaña dorada',
    user: 'Verificado'
  }, {
    id: 3,
    name: 'Mc Donals',
    user: 'No verificado'
  }, {
    id: 3,
    name: 'Doña Claudia',
    user: 'Verificado'
  }];
  const deleteRestaurant = () => {
    // swal({
    //   title: 'Estas seguro?',
    //   text: 'Una vez eliminado no podras recuperarlo',
    //   icon: 'warning',
    //   buttons: true,
    //   dangerMode: true
    // })
    //   .then((willDelete) => {
    //     if (willDelete) {
    //       swal('Eliminado con exito', {
    //         icon: 'success'
    //       });
    //     }
    //   });
  };

  const verifyRestaurant = (e) => {
    swal(`${e.target.name} ha sido verificado exitosamente`, {
      icon: 'success'
    });
  };

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>Locales</h2>
        <input placeholder="Buscar local" className={style.buscador}></input>
        <select className={style.filtro}>
            <option selected>Todos</option>
            <option>Verificados</option>
            <option>No verificados</option>
        </select>
        <div className={style.containerUserCard}>
            {
                locales.map(u => <>
        <div className={style.userCard}>
            <img className={style.userIcon} src="https://e7.pngegg.com/pngimages/227/108/png-clipart-logo-kfc-red-rebranding-graphic-design-kfc-miscellaneous-white.png"></img>
            <div className={style.nameAndUser}>
            <p className={style.name}>{u.name}</p>
            <p className={style.usernames}>{u.user}</p>
            </div>
            {u.user === 'No verificado' && <button name={u.name} onClick={verifyRestaurant} className={style.button}>Verificar</button>}
            <button className={style.banButton} onClick={deleteRestaurant}>Eliminar</button>
        </div>
        </>
                )}
        </div>
        <Paginado/>
    </div>
  );
};

export default Restaurantes;
