import '@smastrom/react-rating/style.css';
import './DishCard.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

function DishCard ({
  name,
  type,
  image,
  price,
  description,
  id,
  edit,
  editDish,
  delDish
}) {
  return (
    <div className='DishCard animated-element'>
      {edit && (
        <div className='dish-icons-container'>
          <p onClick={() => delDish(id)} className='iconsDishCard'>
            <FaTrash className='delete-icon' />
          </p>
          <p onClick={() => editDish(id)} className='iconsDishCard'>
            <FaEdit className='edit-icon' />
          </p>
        </div>
      )}
      <div className='imgCard-container'>
        {image
          ? (
            <img src={image.url} alt={name} className='imgCard' />
            )
          : (
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/1/1d/Restaurant_in_The_Mus%C3%A9e_d%27Orsay.jpg'
              alt='imagen default'
              className='imgCard'
            />
            )}
        {edit && <div className='dish-icons-overlay'></div>}
        {edit && (
          <div className='dish-icons-container'>
            <p onClick={() => onClose(id)} className='iconsDishCard'>
              <FaTrash className='delete-icon' />
            </p>
            <p onClick={() => editDish(id)} className='iconsDishCard'>
              <FaEdit className='edit-icon' />
            </p>
          </div>
        )}
      </div>
      <div className='infoCard'>
        <h2 className='placeName'>{name || 'No name'}</h2>
        {price && <p className='dish-price'>$ {price} USD</p>}
        {type && <p className='dish-type'>{type}</p>}
        {description && <p className='description'>{description}</p>}
      </div>
    </div>
  );
}

export default DishCard;
