import axios from 'axios';
import { useState } from 'react';
import swal from 'sweetalert';
import { useDispatch } from 'react-redux';
import { getLocalsToVerify } from '../../../../redux/actions/LocalsAdmin';
import { AiFillFileUnknown } from 'react-icons/ai';
import { FaHouseUser } from 'react-icons/fa';
import { BsHouseSlashFill } from 'react-icons/bs';

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
      swal(error.response.data.message, { type: 'error' });
    }
  };
  const handlerAssignLocal = async () => {
    try {
      await axios.put('/administrator/assignLocal', { userId: local.UserId, localId: local.id });
      swal('Local asignado con éxito', { type: 'success' });
      dispatch(getLocalsToVerify());
    } catch (error) {
      swal(error.response.data.message, { type: 'error' });
    }
  };
  const handlerDenyLocal = async () => {
    try {
      await axios.put('/administrator/denyLocal', { documentId: local.Document.id, localId: local.id });
      swal('Local denegado con éxito', { type: 'success' });
      dispatch(getLocalsToVerify());
    } catch (error) {
      swal(error.response.data.message, { type: 'error' });
    }
  };
  return (
    <tr>
      <td className='align-middle'>{local?.name}</td>
      <td className='align-middle'>{local?.User?.name}</td>
      <td className='align-middle'>{ROLES[local?.User?.role]}</td>
      <td className='align-middle'><button onClick={handleShowDocument} className='dash-res-button'><AiFillFileUnknown /></button>
        {documentLink && <a href={documentLink} target='_blank' rel="noreferrer" className='dash-res-anchor'>Link al documento</a>}
        </td>
      <td className='align-middle'>
        <button onClick={handlerAssignLocal} className='res-icons assign'>Asignar <FaHouseUser /></button>
        <button onClick={handlerDenyLocal} className='res-icons deny'>Denegar <BsHouseSlashFill /></button>
        </td>
    </tr>
  );
}
