import { useState } from 'react';
import styles from './ClaimLocal.module.css';
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
      <div className={styles.claimContainer}>
        <div className={styles.claimContain}>
            <button onClick={() => closeClaimLocal(false)}>❌</button>
          <h1>Reclama este local</h1>
          {/* TODO: COLOCAR UN DISCLAIM
          pd: los estilos son lava c:
          */}
          <form onSubmit={handleSubmitDocument}>
            <input type="file" name="document" onChange={hanlderInputDocument} accept='application/pdf'/>
            <button>Enviar documentación</button>
          </form>
        </div>
      </div>
    </>
  );
}
