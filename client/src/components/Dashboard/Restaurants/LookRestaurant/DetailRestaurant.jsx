import { useDispatch, useSelector } from 'react-redux';

import { DetailLocal } from '../../../../redux/actions/local';
import { useEffect } from 'react';
import './DetailRestaurant.css';
import { getReviews, getUserProfile } from '../../../../redux/actions/actions';
import photoDefault from '../../../../assets/storePhoto.png';
import imageDefault from '../../../../assets/imagenDefault.png';
const DetailRestaurant = ({ id, handleDetail }) => {
  const dispatch = useDispatch();
  const { detail, reviews, userProfile } = useSelector((state) => state);
  useEffect(() => {
    dispatch(DetailLocal(id));
    dispatch(getReviews(id));

    console.log(reviews);
  }, []);
  useEffect(() => {
    if (detail && detail.verified === 'verified') {
      dispatch(getUserProfile(detail.UserId
      ));
    }
    console.log(reviews);
  }, [detail]);
  console.log(reviews);
  return <div className='detailRestaurantContainer'>
        <button onClick={handleDetail}>cerrar</button>
       <div className='localDetail'>
      {detail && detail.Images && detail.Images.length ? <img src={detail.Images[0].url} alt='image' className='photoselect' /> : <img src={photoDefault} alt='foto' className='photoselect' />}
        <p>{detail.name}</p>
      <p>{detail.location}</p>
      <p>estado:{detail.verified}</p>

       </div>
       <div className='userDetail'>
      {userProfile && userProfile.Images && userProfile.Images.length ? <img src={userProfile.Images[0].url} alt='image' className='photoselect' /> : <img src={imageDefault} alt='foto' className='photoselect' />}
      <p>{userProfile.name} {userProfile.lastname}</p>
      <p>Edad:{userProfile.age}</p>
       </div>
       <div className='Reviews'>

       </div>
    </div>;
};
export default DetailRestaurant;
