import { toast } from 'react-toastify';
import './Restaurant.css';
// icons
import { BsPersonFillAdd } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import photoDefault from '../../../assets/storePhoto.png';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLocal, getAllLocal } from '../../../redux/actions/admin';
import { useEffect, useState } from 'react';
import Users from '../Users/Users';
import SelectRestaurant from './LookRestaurant/SelectRestaurant';
import DetailRestaurant from './LookRestaurant/DetailRestaurant';
const OneRestaurant = ({ name, image, verified, id }) => {
  const [adduser, setAdduser] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [verifiedLocal, setverifiedLocal] = useState(verified);
  const [DetailRestaurantD, setDetailRestaurantD] = useState(false);
  useEffect(() => {
    setverifiedLocal(verified);
  }, [verified]);

  const dispatch = useDispatch();
  const deleteRestaurant = async () => {
    if (user.role === 'superAdmin' || user.role === 'admin') {
      const response = await dispatch(deleteLocal(id));
      if (response === true) {
        toast.error('Error', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
      } else {
        toast.success('¡local borrado!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000
        });
      }
      dispatch(getAllLocal(1, ''));
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

  return <div className="Restaurantcard">
      {image && image.length ? <img src={image[0].url} alt='image' className='RestaurantImage' /> : <img src={photoDefault} alt='image' className='RestaurantImage' />}
      <div className='name'>
    <h3>{name}</h3>
      </div>
      <div className='state'>
    <h3>Estado:{verifiedLocal}</h3>
      </div>
      {verifiedLocal && verifiedLocal === 'unVerified'
        ? <div className='state'>
          <BsPersonFillAdd onClick={handleAdd} />
              <AiFillDelete onClick={deleteRestaurant} />
      </div>
        : <div>

            <FaUserEdit onClick={handleAdd} /> <AiFillDelete onClick={deleteRestaurant}/></div>}
    {adduser === true && <div className='userAdd'>   {adduser && <SelectRestaurant id={id} handleAdd={handleAdd}/>}<Users localId={id} handleAdd={handleAdd}/></div>}
    {DetailRestaurantD === true && <DetailRestaurant id={id} handleDetail={handleDetail}/>}
    <button onClick={handleDetail}>Detalles</button>
</div>;
};
export default OneRestaurant;
