import "./modifyReviewModal.css"
const ModifyReviewModal = ({ closeReviewModal })=>{
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="closeBtnContainer" >
                    <button onClick={() => { closeReviewModal(false); }}
                        className="closeBtn"
                    >X</button>
                </div>

                <div className="title">
                    <h1 className="title">Actualizar Review</h1>
                </div>
                <div className="body">
                    <form action="">

                    </form>
                </div>

                
                <div className="footer">
                    <button>Regresar</button>
                    
                </div>

            </div>

        </div>
    )
   
}

export default ModifyReviewModal