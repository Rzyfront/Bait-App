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
                swal('¡Local eliminado con éxito!', {
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
      <td className="align-middle">{name}</td>
      {
        verified === 'unVerified'
          ? <td className="align-middle">A verificar</td>
          : verified === 'verified'
            ? <td className="align-middle">Verificado</td>
            : <td className="align-middle">Suspendido</td>
      }
      <td className="align-middle">
        <button onClick={handleDetail} className="ActionsDetailRestaurant"><IoIosInformationCircleOutline /></button>
        {DetailRestaurantD && <DetailRestaurant id={id} handleDetail={handleDetail} />}
      </td>
      {
        filter.verified === 'unVerified' && <td className="align-middle">
          Documentos
        </td>
      }
      <td className="align-middle">Usuario</td>
      <td className="align-middle">
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

// const OneRestaurant = ({ name, image, verified, id }) => {
//   const [adduser, setAdduser] = useState(false);
//   const { user } = useSelector((state) => state.user);
//   const [verifiedLocal, setverifiedLocal] = useState(verified);
//   const [DetailRestaurantD, setDetailRestaurantD] = useState(false);
//   useEffect(() => {
//     setverifiedLocal(verified);
//   }, [verified]);

//   const dispatch = useDispatch();
//   const deleteRestaurant = async () => {
//     if (user.role === 'superAdmin' || user.role === 'admin') {
//       const response = await dispatch(deleteLocal(id));
//       if (response === true) {
//         toast.error('Error', {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 2000
//         });
//       } else {
//         toast.success('¡local borrado!', {
//           position: toast.POSITION.TOP_CENTER,
//           autoClose: 2000
//         });
//       }
//       dispatch(getAllLocal(1, ''));
//     }
//   };
//   const handleAdd = () => {
//     if (adduser === true) {
//       setverifiedLocal('verified');
//       setAdduser(false);
//     } else {
//       setAdduser(true);
//     }
//   };

//   const handleDetail = () => {
//     if (DetailRestaurantD === false) {
//       setDetailRestaurantD(true);
//     } else {
//       setDetailRestaurantD(false);
//     }
//   };

//   return <div className="Restaurantcard">
//     {/* {image && image.length ? <img src={image[0].url} alt='image' className='RestaurantImage' /> : <img src={photoDefault} alt='image' className='RestaurantImage' />} */}
//     <div className='name'>

//       <h3>Nombre: {name}</h3>
//     </div>
//     <div className='RestaurantDetail'>
//       {verifiedLocal && verifiedLocal === 'unVerified'
//         ? <div className=''>
//           <BsPersonFillAdd onClick={handleAdd} />
//           <AiFillDelete onClick={deleteRestaurant} />
//         </div>
//         : <div>

//           <FaUserEdit onClick={handleAdd} /> <AiFillDelete onClick={deleteRestaurant} /></div>}
//       {adduser === true && <div className='userAdd'>   {adduser && <SelectRestaurant id={id} handleAdd={handleAdd} />}<Users localId={id} handleAdd={handleAdd} /></div>}

//       <button className="ActionsDetailRestaurant" onClick={handleDetail} >{DetailRestaurantD === false ? 'Detalles' : 'Ocultar'}</button>

//     </div>
//     {DetailRestaurantD === true && <DetailRestaurant id={id} handleDetail={handleDetail} />}
//   </div>;
// };
// export default OneRestaurant;
