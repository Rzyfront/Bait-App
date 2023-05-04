import swal from 'sweetalert';
import './Restaurant.css';
// icons
import { FaUserEdit } from 'react-icons/fa';
import { IoIosInformationCircleOutline, IoMdArchive } from 'react-icons/io';

import { useDispatch, useSelector } from 'react-redux';
import { deleteLocal, getAllLocal } from '../../../redux/actions/admin';
import { useEffect, useState } from 'react';
import DetailRestaurant from './LookRestaurant/DetailRestaurant';

const VERIFIED_STATE = {
  unVerified: 'No verificado',
  verified: 'Verficado',
  archived: 'Archivado'
};

const OneRestaurant = ({ name, verified, id }) => {
  // const [adduser, setAdduser] = useState(false);
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
        text: 'Una vez borrado no podrás deshacer esta acción',
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
  // const handleAdd = () => {
  //   if (!adduser) {
  //     setverifiedLocal('verified');
  //     setAdduser(false);
  //   } else {
  //   setAdduser(true);
  //   }
  // };

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
      <td className='align-middle'>{VERIFIED_STATE[verified]}</td>
      <td className='align-middle'>
        <button onClick={handleDetail} className='detail-icon-dash-res'><IoIosInformationCircleOutline /></button>
        {showModal && (
          <div className='userAdd'>
            <DetailRestaurant id={id} handleDetail={() => setShowModal(false)} />
          </div>
        )}
        {/* {DetailRestaurantD && <DetailRestaurant id={id} handleDetail={handleDetail} />} */}
      </td>
        {verifiedLocal && verifiedLocal === 'unVerified'
          ? (
            < td className='align-middle'>
                {/* <button className='res-icons assign' onClick={handleAdd} >
                  <BsPersonFillAdd/>
                </button> */}
                <button className='res-icons deny' onClick={deleteRestaurant} >
                  Archivar  <IoMdArchive />
                </button>
            </td>
            )
          : (
            <td>
                <button className='res-icons deny' title='Remover propietario'><FaUserEdit /></button>
                <button className='res-icons deny' onClick={deleteRestaurant} >
                  Archivar  <IoMdArchive />
                </button>
            </td>
            )}
    </tr>
  );
};

export default OneRestaurant;
