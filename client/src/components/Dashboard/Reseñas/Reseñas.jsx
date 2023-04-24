import style from '../Dashboard.module.css';
import Paginado from '../Paginado/Paginado';

const Reseñas = ({ fn }) => {
  const reseñas = [{
    id: 1,
    local: 'La taberna de Rodri',
    name: 'Edgar Vilchez',
    title: 'Pesimo servicio',
    stars: '2'
  }, {
    id: 1,
    local: 'K1LO',
    name: 'Juan Vargas',
    title: 'Probando...',
    stars: '4'
  }, {
    id: 1,
    local: 'Amanecer Llanero',
    name: 'Yubirizaida',
    title: 'Excelente lugar',
    stars: '5'
  }, {
    id: 1,
    local: 'Starbucks',
    name: 'Edgar Vilchez',
    title: 'Muy caro',
    stars: '1'
  }, {
    id: 1,
    local: 'Doña Claudia',
    name: 'Franco Gutierrez',
    title: 'Comida con pelos',
    stars: '1'
  }];

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>Reseñas</h2>
        <div className={style.containerUserCard}>
            {
                reseñas.map(u => <>
        <div className={style.userCard}>
            <img className={style.userIcon} src="https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo-180x180.jpg?resize=180%2C180"></img>
            <div className={style.nameAndUser}>
            <p className={style.name}>{u.local}</p>
            <p className={style.usernames}>{u.name}</p>
            </div>
            <div className={style.titleAndStars}>
            <p className={style.name}>{u.title}</p>
            <p className={style.usernames}>{u.stars} estrellas</p>
            </div>
            <button className={style.buttonExaminar} onClick={() => fn(3)}>Examinar</button>
        </div>
        </>
                )}
        </div>
        <Paginado/>
    </div>
  );
};

export default Reseñas;
