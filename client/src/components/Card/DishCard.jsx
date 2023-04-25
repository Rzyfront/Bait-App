import '@smastrom/react-rating/style.css';
import './Card';
import { FaEdit, FaTrash } from 'react-icons/fa';

function DishCard ({
  name,
  type,
  image,
  price,
  description,
  id,
  onClose
}) {
  return (
        <div className='Card animated-element' key={id}>
      <span onClick={() => onClose(id)}><FaTrash className='delete-icon' /><FaEdit className='edit-icon' /></span>
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
            <div className='infoCard'>
                <h2 className='placeName'>{name || 'No name'}</h2>
                {price && <p className='Price'>{price}</p>}
                {type && <p className='type'>{type}</p>}
              {description && <p className='description'>{description}</p>}
            </div>

        </div>
  );
}

export default DishCard;
