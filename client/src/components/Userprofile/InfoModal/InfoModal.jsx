
import "../InfoModal/InfoModal.css"
const infoModal = ({ closeModal, name, age, email, lastname, phone_number, location,verified })=>{
   
    return(
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="closeBtnContainer" >
                    <button onClick={() => { closeModal(false) }}
                        className="closeBtn"
                    >X</button>
                </div>
               
                <div className="title">
                    <h1 className="title">Informacion Personal</h1>
                </div>
                <div className="body">
                    <p>Nombre:{name} {lastname}</p>
                    <p>Edad : {age} años</p>
                    <p>Email :{email} </p>
                    <p>Telefono : {phone_number}</p>
                    <p>Ubicacion : {location}</p>
                    <p>Estado : {verified}</p>
                </div>
                
              
                <div className="footer">
                    <button>Regresar</button>
                    <button>Actualizar Info</button>
                </div>
               
            </div>
           
        </div>
    )
    
}

export default infoModal