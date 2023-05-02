import axios from 'axios';
import styles from './LocalsCards.module.css';
import { useState } from 'react';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { getLocalsToVerify } from '../../../../redux/actions/LocalsAdmin';

export default function LocalsCards ({ local }) {
  const dispatch = useDispatch();
  const [documentLink, setDocumentLink] = useState();
  const handleDocument = async () => {
    try {
      const { data } = await axios.get(`/locals/document/${local.id}`);
      setDocumentLink(data.url);
    } catch (error) {
      console.log(error);
      swal(error.response.data.message, { type: 'error' });
    }
  };
  const handlerAssignLocal = async () => {
    try {
      await axios.put('/administrator/assignLocal', { userId: local.UserId, localId: local.id });
      swal('Local asignado con éxito', { type: 'success' });
      dispatch(getLocalsToVerify());
    } catch (error) {
      console.log(error);
      swal(error.response.data.message, { type: 'error' });
    }
  };
  const handlerDenyLocal = async () => {
    try {
      await axios.put('/administrator/denyLocal', { documentId: local.Document.id, localId: local.id });
      swal('Local denegado con éxito', { type: 'success' });
      dispatch(getLocalsToVerify());
    } catch (error) {
      console.log(error);
      swal(error.response.data.message, { type: 'error' });
    }
  };
  return (
    <>
      <div className={styles.localCardContainer}>
        <h1>{local?.name}</h1>
        <h2>{local?.User?.name}</h2>
        <button onClick={handleDocument} >Document</button>
        {documentLink && <a href={documentLink} target='_blank' rel="noreferrer" >Link al documento</a>}
        <button onClick={handlerAssignLocal}>Asignar local</button>
        <button onClick={handlerDenyLocal}>Denegar</button>
      </div>
    </>
  );
}
