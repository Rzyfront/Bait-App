// import { toast } from 'react-toastify';
import swal from 'sweetalert';
import './Restaurant.css';
// icons
import { BsPersonFillAdd } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocal, getAllLocal } from '../../../redux/actions/admin';
import { useEffect, useState } from 'react';
import Users from '../Users/Users';
import SelectRestaurant from './LookRestaurant/SelectRestaurant';
import DetailRestaurant from './LookRestaurant/DetailRestaurant';

const VERIFIED_STATE = {
  unVerified: 'No verificado',
  verified: 'Verficado',
  archived: 'Archivado'
};

const OneRestaurant = ({ name, image, verified, filter, id }) => {
  const [adduser, setAdduser] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [verifiedLocal, setverifiedLocal] = useState(verified);
  const [DetailRestaurantD, setDetailRestaurantD] = useState(false);

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
  const handleAdd = () => {
    if (adduser === true) {
      setverifiedLocal('verified');
      setAdduser(false);
    } else {
      setAdduser(true);
    }
  };

  const handleDetail = () => {
    if (DetailRestaurantD === false) {
      setDetailRestaurantD(true);
    } else {
      setDetailRestaurantD(false);
    }
  };

  return (
    <tr>
      <td className='align-middle'>{name}</td>
      <td className='align-middle'>{VERIFIED_STATE[verified]}</td>
      <td className='align-middle'>
        <button onClick={handleDetail} className='ActionsDetailRestaurant'><IoIosInformationCircleOutline /></button>
        {DetailRestaurantD && <DetailRestaurant id={id} handleDetail={handleDetail} />}
      </td>
      <td className='align-middle'>
        {verifiedLocal && verifiedLocal === 'unVerified'
          ? (
            <>
              <BsPersonFillAdd onClick={handleAdd} />
              <AiFillDelete onClick={deleteRestaurant} />
            </>
            )
          : (
            <>
              <FaUserEdit onClick={handleAdd} />{' '}
              <AiFillDelete onClick={deleteRestaurant} />
            </>
            )}
      </td>
    </tr>
  );
};

export default OneRestaurant;
