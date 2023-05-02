import { Rating as RatingStar, ThinStar } from '@smastrom/react-rating';
import { User as UserComp } from '@nextui-org/react';
import UserImgDefault from '../../../assets/UserDefatult.svg';
import './ReviewsCard.css';
import { useState } from 'react';
function ReviewsCard ({ index, User, title, rating, comment, Image, environment, food, qaPrice, service, reviewDate }) {
  const [showMore, setShowMore] = useState(false);
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: '#343434',
    inactiveFillColor: '#3434343B'
  };

  const handleShowMore = () => {
    if (showMore) {
      setShowMore(false);
    } else {
      setShowMore(true);
    }
  };
  return (
     <div key={index} className={`ReviewCard-Completed ${!showMore && 'ReviewCard-Simple'}`}>
            <div className='ReviewCard-head'>
                <UserComp
                src={UserImgDefault}
                name={`${User?.name} ${User?.lastname}`}
                description={reviewDate}
                className='UserComponent'
                />
                <div className='Rating-General'>
                    <h2 className='Rating-Num'>{rating}</h2>
                    <RatingStar
                    readOnly
                    style={{ maxWidth: 100 }}
                    value={rating}
                    itemStyles={myStyles}
                  />
                </div>
            </div>
            <div className='Review-Main-Info'>
                  <h3 className='Review-Card-Title'>{title}</h3>
                 <div className='Review-Comment-Group'>
                    <p className='Comment'>{comment}</p>
                    <p className='More' onClick={handleShowMore}>{showMore
                      ? 'Ver menos...'
                      : 'Ver mas...'}</p>
                 </div>
            </div>
            {showMore &&
              <div className='Aditional-Info'>
            <div className='Info-left'>
            <div className='Info-title-Group'>
              <h4 className='Info-Title'>Categorías calificadas</h4>
              <div className='Info-left-decoration'></div>
              </div>
            <div className='Rating-C-Group-Container'>
                <h5 className='Rating-C-Group'>Ambiente: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Comida: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Calidad-Precio: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
                <h5 className='Rating-C-Group'>Servicio: <RatingStar readOnly style={{ maxWidth: 100 }} value={rating || 0} className='Stars-Cards' itemStyles={myStyles}/></h5>
            </div>
        </div>
                <div className='Rigth-Img'>
                    {Image
                      ? <img src={Image.url} alt='ImageDatabase'/>
                      : <img
                    src={
                        'https://img.freepik.com/vector-premium/icono-marco-fotos-foto-vacia-blanco-vector-sobre-fondo-transparente-aislado-eps-10_399089-1290.jpg'
                    }
                    alt='Img-Review-Default'
                    /> }
                </div>
            </div>
            }

            </div>
  );
}

export default ReviewsCard;

// 0
// :
// Image
// :
// {url: 'https://res.cloudinary.com/drnt5l19i/image/upload/v1682896862/grxu9qhjlskikwpwaovr.jpg'}
// Local
// :
// {name: 'Shisneys Muzzolini', id: 1}
// LocalId
// :
// 1
// User
// :
// Image
// :
// null
// age
// :
// 87
// email
// :
// "tafok86431@pixiil.com"
// id
// :
// 4
// lastname
// :
// "Ramirez"
// name
// :
// "Chikiluki"
// role
// :
// "user"
// [[Prototype]]
// :
// Object
// UserId
// :
// 4
// comment
// :
// "comida buena, sana"
// createdAt
// :
// "2023-05-01T01:03:48.922Z"
// environment
// :
// 3
// food
// :
// 5
// id
// :
// 15
// qaPrice
// :
// 5
// rating
// :
// 4
// service
// :
// 3
// ticket
// :
// {url: 'https://res.cloudinary.com/drnt5l19i/image/upload/v1682895180/ryla1tzoa029obzgvb36.jpg'}
// title
// :
// "soy reseña nueva 2"
// toxicity
// :
// 0.010681152
// updatedAt
// :
// "2023-05-01T01:03:56.299Z"
// verified
// :
// "verified"
