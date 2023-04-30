import { useDispatch, useSelector } from 'react-redux';
import { DetailLocal } from '../../../../redux/actions/local';
import { useEffect } from 'react';
import './DetailRestaurant.css';
import { getReviews, getUserProfile } from '../../../../redux/actions/actions';

const DetailRestaurant = ({ id, handleDetail }) => {
  const dispatch = useDispatch();
  const { detail, reviews, userProfile } = useSelector((state) => state);
  useEffect(() => {
    dispatch(DetailLocal(id));
    dispatch(getReviews(id));

    console.log(detail, reviews, userProfile);
  }, []);
  useEffect(() => {
    if (detail && detail.verified === 'verified') {
      dispatch(getUserProfile(detail.UserId
      ));
    }
  }, [detail]);
  console.log(detail, reviews, userProfile);
  return <div className='detailRestaurantContainer'>
        <button onClick={handleDetail}>cerrar</button>
        blabla bla
    </div>;
};
export default DetailRestaurant;
