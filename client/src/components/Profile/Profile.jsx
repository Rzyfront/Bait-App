import { useEffect, useState } from 'react';
import '@smastrom/react-rating/style.css';
import Slider from 'react-slick';
import { getReviews } from '../../redux/actions/actions';
import { Menu, Navbar, Reviews, ReviewsForm, InfoLocalsProfile } from '../components';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailLocal } from '../../redux/actions/local';
import { getMenu } from '../../redux/actions/menuDish';

function Profile () {
  const dispatch = useDispatch();
  const { detail, reviews, successDish } = useSelector(state => state);

  const { id } = useParams();

  useEffect(() => {
    dispatch(DetailLocal(id));
  }, [id]);

  useEffect(() => {
    dispatch(getMenu(id));
  }, [successDish]);

  useEffect(() => {
    if (id) dispatch(getReviews(id));
  }, []);

  // const [toogleModal, setToggleModal] = useState('ReviewsLocal');
  // const [toogleModal2, setToggleModal2] = useState(false);
  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };
  console.log(detail);
  return (
    <>
      <Navbar />
      <div className="Profile-Locals animated-element">
        <div className='Img-Header'>

 <Slider {...settings}>
         {
          detail.Images?.map(({ url }, index) => {
            return <div key={index} className='Slide-Img-Carrousel'>
            <img src={url} alt={`img${index}`} />
          </div>;
          })
         }
        </Slider>
        </div>
        <div className='Info-Profile-Locals-Container'>
          <InfoLocalsProfile detail={detail}/>
        </div>
      </div>
    </>
  );
}

export default Profile;
