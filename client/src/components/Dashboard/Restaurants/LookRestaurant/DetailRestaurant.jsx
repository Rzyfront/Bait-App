import { useDispatch, useSelector } from 'react-redux';

import { DetailLocal } from '../../../../redux/actions/local';
import { useEffect } from 'react';
import './DetailRestaurant.css';
import { getReviews, getUserProfile } from '../../../../redux/actions/actions';
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
    console.log(detail);
  }, [detail]);
  console.log(detail);
  return <div className='detailRestaurantContainer'>
        {/* <button onClick={handleDetail}>cerrar</button> */}
       <div className='localDetail'>

      {/* {detail && detail.Images && detail.Images.length ? <img src={detail.Images[0].url} alt='image' className='photoselect' /> : <img src={photoDefault} alt='foto' className='photoselect' />} */}
        {/* <p>{detail.name}</p> */}
      <div className='graph1'>

        </div>
      <p>{detail.location}</p>
      <p>Estado: {detail.verified}</p>
      </div>
    {detail && detail.verified === 'verified' && <div className='userDetail'>
      {userProfile && userProfile.Images && userProfile.Images.length ? <img src={userProfile.Images[0].url} alt='image' className='photoselect' /> : <img src={imageDefault} alt='foto' className='photoselect' />}
      <p>{userProfile.name} {userProfile.lastname}</p>
      <p>Edad:{userProfile.age}</p>
    </div>}

    </div>;
};
export default DetailRestaurant;
