import './SelectProfileBar.css';

function SelectProfileBar ({ ShowReviews, ShowMenu, toggleModal, setToggleModal }) {
  return (
    <div className='SelectProfileBar-Component'>
        <div className={`Options ${(toggleModal === ShowReviews) && 'CurrentSelection'}`} onClick={() => setToggleModal(ShowReviews)}>Reseñas</div>
        <div className={`Options ${(toggleModal === ShowMenu) && 'CurrentSelection'}`} onClick={() => setToggleModal(ShowMenu)}>Menu</div>
    </div>
  );
}

export default SelectProfileBar;
