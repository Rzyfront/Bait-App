import swal from 'sweetalert';
import './Restaurant.css';
// icons
// import { FaUserEdit } from 'react-icons/fa';
import { IoIosInformationCircleOutline, IoMdArchive } from 'react-icons/io';

import { useDispatch, useSelector } from 'react-redux';
import { deleteLocal, getAllLocal } from '../../../redux/actions/admin';
import { useEffect, useState } from 'react';
import DetailRestaurant from './LookRestaurant/DetailRestaurant';
import { LOCAL_STATE } from '../dictionaries';

const OneRestaurant = ({ name, verified, id }) => {
  const { user } = useSelector((state) => state.user);
  const [verifiedLocal, setverifiedLocal] = useState(verified);
  const [DetailRestaurantD, setDetailRestaurantD] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setverifiedLocal(verified);
  }, [verified]);

  const dispatch = useDispatch();
  const deleteRestaurant = () => {
    if (user.role === 'superAdmin' || user.role === 'admin') {
      swal({
        title: '¿Está seguro(a)',
        text: 'Al aceptar el local será archivado y removido del sitio.',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            dispatch(deleteLocal(id)).then((res) => {
              if (!res) {
                swal('Local archivado.', {
                  icon: 'success'
                });
                dispatch(getAllLocal(1, ''));
              } else {
                swal('Acción cancelada');
              }
            });
          }
        });
    }
  };

  const handleDetail = () => {
    if (DetailRestaurantD === false) {
      setDetailRestaurantD(true);
      setShowModal(true);
    } else {
      setDetailRestaurantD(false);
    }
  };

  return (
    <tr>
      <td className='align-middle'>{name}</td>
      <td className='align-middle'>{LOCAL_STATE[verified]}</td>
      <td className='align-middle'>
        <button onClick={handleDetail} className='detail-icon-dash-res'><IoIosInformationCircleOutline /></button>
        {showModal && (
          <div className='userAdd'>
            <DetailRestaurant id={id} handleDetail={() => setShowModal(false)} />
          </div>
        )}
      </td>
        {verifiedLocal && verifiedLocal === 'unVerified'
          ? (
            < td className='align-middle'>
                <button className='res-icons deny' onClick={deleteRestaurant} >
                  Archivar  <IoMdArchive />
                </button>
            </td>
            )
          : (
            <td>
                {/* <button className='res-icons deny' title='Remover propietario'><FaUserEdit /></button> */}
                <button className='res-icons deny' onClick={deleteRestaurant} >
                  Archivar  <IoMdArchive />
                </button>
            </td>
            )}
    </tr>
  );
};

export default OneRestaurant;
