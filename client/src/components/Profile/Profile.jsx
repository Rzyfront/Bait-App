import { useEffect, useState } from 'react';
import '@smastrom/react-rating/style.css';
import Slider from 'react-slick';
import { getReviews } from '../../redux/actions/actions';
import { Menu, Navbar, Reviews, InfoLocalsProfile, SelectProfileBar } from '../components';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailLocal } from '../../redux/actions/local';
import { getMenu } from '../../redux/actions/menuDish';

function Profile () {
  const [ShowReviews, ShowMenu] = ['ShowReviews', 'ShowMenu'];
  const dispatch = useDispatch();
  const { detail, successDish } = useSelector(state => state);
  const [toggleModal, setToggleModal] = useState(ShowReviews);
  const [ShowReviewList, setShowReviewList] = useState(false);
  const { id } = useParams();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(DetailLocal(id));
  }, [id]);

  useEffect(() => {
    dispatch(getMenu(id));
  }, [successDish]);

  // useEffect(() => {
  //   if (id) dispatch(getReviews(id));
  // }, []);

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
  return (
    <>
      <Navbar />
      <div className="Profile-Locals animated-element">
        {ShowReviewList && <ReviewsForm ShowReviewList={ShowReviewList} setShowReviewList={setShowReviewList} id={id}/>}
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
          <SelectProfileBar toggleModal={toggleModal} setToggleModal={setToggleModal} ShowReviews={ShowReviews} ShowMenu={ShowMenu} setShowReviewList={setShowReviewList}/>
          {(toggleModal === ShowReviews) && <Reviews localId={id} page={page} setPage={setPage}/>}
          {(toggleModal === ShowMenu) && <Menu localUser={detail.UserId}/>}
        </div>
      </div>
    </>
  );
}

export default Profile;
