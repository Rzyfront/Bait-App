import { useEffect, useState } from 'react';
import '@smastrom/react-rating/style.css';
import Slider from 'react-slick';
// import BaitImgAux from '../../assets/BaitPhotoAux.jpg';
// import { getReviews } from '../../redux/actions/actions';
import { Menu, Navbar, Reviews, InfoLocalsProfile, SelectProfileBar } from '../components';
import './Profile.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DetailLocal, CleanDetail } from '../../redux/actions/local';
import { getMenu } from '../../redux/actions/menuDish';
import ReviewLocal from '../FindLocals/ReviewLocal/ReviewLocal';
import ClaimLocal from './ClaimLocal/ClaimLocal';
import LocalsCompleteData from '../CreateLocals/LocalsCompleteData/LocalsCompleteData';
import { Oval } from 'react-loader-spinner';

function Profile () {
  const queryParams = new URLSearchParams(location.search);
  const [ShowReviews, ShowMenu] = ['ShowReviews', 'ShowMenu'];
  const dispatch = useDispatch();
  const { detail, successDish } = useSelector(state => state);
  const [toggleModal, setToggleModal] = useState(ShowReviews);
  const [ShowReviewList, setShowReviewList] = useState(!!queryParams.get('review'));
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [modalClaimLocal, setModalClaimLocal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);

  const handlerClaimLocalModal = (show) => {
    setModalClaimLocal(show);
  };
  useEffect(() => {
    dispatch(DetailLocal(id));
    return () => { dispatch(CleanDetail()); };
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
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };
  if (detail?.Images?.length > 2) {
    settings.slidesToShow = 3;
  } else if (detail?.Images?.length === 2) {
    settings.slidesToShow = 2;
  } else if (detail?.Images?.length === 1) {
    settings.slidesToShow = 1;
  }
  return (detail.Images
    ? (
    <>
      <Navbar />
      <div className="Profile-Locals animated-element">
        {modalUpdate && <LocalsCompleteData detail={detail} setModalUpdate={setModalUpdate}/>}
        <div className='Img-Header'>

        <Slider {...settings}>
         {(detail.Images && detail.Images.length > 2) &&
          detail.Images?.map(({ url }, index) => {
            return <div key={index} className='Slide-Img-Carrousel'>
            <img src={url} alt={`img${index}`} />
          </div>;
          })}
        </Slider>

        </div>
        {ShowReviewList
          ? <ReviewLocal sendReview={setShowReviewList}/>
          : <div className='Info-Profile-Locals-Container'>
              <InfoLocalsProfile detail={detail} showClaimLocal={handlerClaimLocalModal} setModalUpdate={setModalUpdate}/>
              <SelectProfileBar toggleModal={toggleModal} setToggleModal={setToggleModal} ShowReviews={ShowReviews} ShowMenu={ShowMenu} setShowReviewList={setShowReviewList}/>
              {(toggleModal === ShowReviews) && <Reviews localId={id} page={page} setPage={setPage}/>}
              {(toggleModal === ShowMenu) && <Menu localUser={detail.UserId}/>}
              {modalClaimLocal && <ClaimLocal closeClaimLocal={handlerClaimLocalModal} localId={detail.id}/>}
          </div> };
      </div>
    </>
      )
    : (
      <div className='SpinnerLocalsContainer'>
    <Oval
      height={80}
      width={80}
      color="#3884fd"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#343434"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
    </div>
      )
  );
}

export default Profile;