import { useDispatch, useSelector } from 'react-redux';
import { DetailLocal } from '../../../../redux/actions/local';
import { useEffect } from 'react';
import './DetailRestaurant.css';
import { getReviews } from '../../../../redux/actions/actions';

const DetailRestaurant = ({ id, handleDetail }) => {
  const dispatch = useDispatch();
  const { detail, reviews } = useSelector((state) => state);
  useEffect(() => {
    dispatch(DetailLocal(id));
    dispatch(getReviews(id));
    console.log(detail, reviews);
  }, []);
  console.log(detail, reviews);
  return <div className='detailRestaurantContainer'>
        <button onClick={handleDetail}>cerrar</button>
        blabla bla
    </div>;
};
export default DetailRestaurant;
