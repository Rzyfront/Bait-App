import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { getLocalsToVerify } from '../../../../redux/actions/LocalsAdmin';

const ROLES = {
  admin: 'Administrador',
  superAdmin: 'Súper admin',
  user: 'Usuario',
  owner: 'Propietario'
};

export default function LocalsCards ({ local }) {
  const dispatch = useDispatch();
  const [documentLink, setDocumentLink] = useState();
  const handleShowDocument = async () => {
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
    <tr>
      <td className='align-middle'>{local?.name}</td>
      <td className='align-middle'>{local?.User?.name}</td>
      <td className='align-middle'>{ROLES[local?.User?.role]}</td>
      <td className='align-middle'><button onClick={handleShowDocument} >Document</button>
        {documentLink && <a href={documentLink} target='_blank' rel="noreferrer" >Link al documento</a>}
        </td>
      <td className='align-middle'>
          <button onClick={handlerAssignLocal}>Asignar local</button>
          <button onClick={handlerDenyLocal}>Denegar</button>
        </td>
    </tr>
  );
}
