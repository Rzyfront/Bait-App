import style from '../Dashboard.module.css';

const ReseñaDetail = () => {
  const reseñasola = {
    id: 1,
    local: 'La taberna de Rodri',
    name: 'Edgar Vilchez',
    title: 'Pesimo servicio',
    content: 'Esa mierda no sirve para nada, no me gusto la atencion, ese HDP del mesero no sabe atender, que asco',
    stars: '2'
  };

  return (
    <div className={style.options}>
        <h2 className={style.nameSection}>Reseña de Edgar Vilchez</h2>
        <div className={style.containerReview}>
        <div className={style.reseña}>
            <h3 className={style.tituloReseña}>{reseñasola.title}</h3>
            <h4 className={style.contentReseña}>{reseñasola.content}</h4>
            <div className={style.userCard}>
            <img className={style.userIcon} src="https://i0.wp.com/lamiradafotografia.es/wp-content/uploads/2014/07/foto-perfil-psicologo-180x180.jpg?resize=180%2C180"></img>
            <div className={style.nameAndUser}>
            <p className={style.name}>Edgar Vilchez</p>
            <p className={style.usernames}>@edgarrios</p>
            </div>
            <div className={style.titleAndStars} style={{ marginLeft: '300px' }}>
            <p>Reseñas creadas: 283</p>
            <p>Alertas administrativas: 1</p>
            </div>
        </div>
            <div className={style.interactuar}>
                <button className={style.botonAccept}>Aceptar</button>
                <button className={style.botonDenied}>Rechazar</button>
            </div>
        </div>
        <div className={style.profiler}>
        <div className={style.pruebas}>
            <img src="https://i0.wp.com/webdelmaestro.com/educacion/wp-content/uploads/2017/01/TTTTT.jpg" className={style.fotos}></img>
        </div>
        </div>
        </div>
    </div>
  );
};

export default ReseñaDetail;
