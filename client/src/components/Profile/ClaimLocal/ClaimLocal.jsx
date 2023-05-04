import { useState } from 'react';
import styles from './ClaimLocal.module.css';
import { TfiClose } from 'react-icons/tfi';
import { GrDocumentUpload } from 'react-icons/gr';
import axios from 'axios';
import swal from 'sweetalert';

export default function ClaimLocal ({ closeClaimLocal, localId }) {
  const [document, setDocument] = useState();
  const hanlderInputDocument = async (e) => {
    try {
      const formData = new FormData();
      formData.append('document', e.target.files[0]);
      const { data } = await axios.post('/locals/document', formData);
      setDocument(data.newDocument);
    } catch (error) {
      swal(error.response.data.message, { type: 'error' });
    }
  };
  const handleSubmitDocument = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/locals/acquisition/${localId}`, { document });
      swal(data.message, { type: 'success' });
    } catch (error) {
      console.log(error);
      swal(error.response.data.message, { type: 'error' });
    }
  };
  return (
    <>
      <div className={styles.claimContainer} onClick={() => closeClaimLocal(false)}>
        <div className={styles.claimContain} onClick={(e) => e.stopPropagation()}>
            <TfiClose className={styles.closeX} onClick={() => closeClaimLocal(false)}/>
          <h2>Reclamá este local</h2>
          {/* TODO: COLOCAR UN DISCLAIM
          pd: los estilos son lava c:
          */}
          <form className={styles.formulario} onSubmit={handleSubmitDocument}>
            <label htmlFor="claimLocals" className={styles.claimLocals}>
              <GrDocumentUpload className={styles.docInputIcon}/>
            </label>
            <input className={styles.inputFile} id='claimLocals' type="file" name="document" onChange={hanlderInputDocument} accept='application/pdf'/>
            <button className={styles.sendDoc}>Enviar documentación</button>
          </form>
        </div>
      </div>
    </>
  );
}
