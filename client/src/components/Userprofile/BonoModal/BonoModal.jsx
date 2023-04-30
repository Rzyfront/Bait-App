
import "../BonoModal/BonoModal.css"
const BonoModal = ({ closeBonoModal, name }) => {

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="closeBtnContainer" >
                    <button onClick={() => { closeBonoModal(false) }}
                        className="closeBtn"
                    >X</button>
                </div>

                <div className="title">
                    <h1 className="title">Bonificaciones</h1>
                </div>
                <div className="body">
                    <h3>Lo sentimos {name} !</h3>
                    <h4>Actualmente no cuentas con bonificaciones por reviews. <br /> <br /> 
                        te animamos a que sigas Realizando  reviews 
                        para obtener maravillosos descuentos en tus restaurants favoritos
                    </h4>
                </div>


                <h2>Modal De informacion</h2>
                <div className="footer">
                    <button>Regresar</button>
                    <button>Actualizar Info</button>
                </div>

            </div>

        </div>
    )

}

export default BonoModal