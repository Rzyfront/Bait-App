import './SelectProfileBar.css';
import { MdOutlineRateReview } from 'react-icons/md';

function SelectProfileBar ({ ShowReviews, ShowMenu, toggleModal, setToggleModal, setShowReviewList }) {
  return (
    <div className='SelectProfileBar-Component'>
       <div className='Selection-Group' title='Ver Reviews'><div className={`Options ${(toggleModal === ShowReviews) && 'CurrentSelection'}`} onClick={() => setToggleModal(ShowReviews)}>Reseñas</div>
        <div className={`Options ${(toggleModal === ShowMenu) && 'CurrentSelection'}`} onClick={() => setToggleModal(ShowMenu)} title='Ver menu'>Menú</div></div>
        <div className='Create-Review-Option' title={'¿Estuviste Aqui? Cuentanos tu experiencia'} onClick={() => setShowReviewList(true)}>Dejá tu reseña <MdOutlineRateReview/></div>
    </div>
  );
}

export default SelectProfileBar;
