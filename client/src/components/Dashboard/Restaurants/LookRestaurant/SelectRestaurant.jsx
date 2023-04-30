import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DetailLocal } from '../../../../redux/actions/local';
import photoDefault from '../../../../assets/storePhoto.png';
import './SelectRestaurant.css';
const SelectRestaurant = ({ id, handleAdd }) => {
  const dispatch = useDispatch();
  const { detail } = useSelector((state) => state);
  useEffect(() => {
    dispatch(DetailLocal(id));
    console.log(detail);
  }, []);
  console.log(detail);
  return <div className='selectcontainer'>
    <div className='father'>
      {detail && detail.Images && detail.Images.length ? <img src={detail.Images[0].url} alt='image' className='photoselect' /> : <img src={photoDefault} alt='foto' className='photoselect'/>}
      {detail && detail.name && <p>{detail.name}</p>}
      <button onClick={handleAdd} className='cancel'>Cancelar</button>
    </div>
  </div>;
};
export default SelectRestaurant;
