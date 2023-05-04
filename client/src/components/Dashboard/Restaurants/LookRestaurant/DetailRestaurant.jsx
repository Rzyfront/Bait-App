import { useDispatch, useSelector } from 'react-redux';
import Chart from '../../../../hooks/Chart';
import { DetailLocal } from '../../../../redux/actions/local';
import { useEffect, useState } from 'react';
import './DetailRestaurant.css';
import { getUserProfile } from '../../../../redux/actions/actions';
import imageDefault from '../../../../assets/imagenDefault.png';
const DetailRestaurant = ({ id }) => {
  const dispatch = useDispatch();
  const { detail, userProfile } = useSelector((state) => state);
  const [data, setData] = useState();
  useEffect(() => {
    dispatch(DetailLocal(id));
  }, []);
  useEffect(() => {
    if (detail && detail.verified === 'verified') {
      dispatch(getUserProfile(detail.UserId
      ));
    }
    if (detail && detail.avgEnvironment) {
      const data = [{ name: 'Ambiente', Calificacion: parseFloat(detail.avgEnvironment).toFixed(1) }, { name: 'Comida', Calificacion: parseFloat(detail.avgFood).toFixed(1) }, { name: 'Precio', Calificacion: parseFloat(detail.avgQaPrice).toFixed(1) }, { name: 'Servicio', Calificacion: parseFloat(detail.avgService).toFixed(1) }];
      setData(data);
    }
  }, [detail]);

  return <div className='detailRestaurantContainer'>
        {/* <button onClick={handleDetail}>cerrar</button> */}
       <div className='localDetail'>
      {detail && detail.avgEnvironment && <Chart data={data} />}

      <div className='graph1'>

        </div>
      <p>{detail.location}</p>
      </div>
    {detail && detail.verified === 'verified' && <div className='userDetail'>
      {userProfile && userProfile.Images && userProfile.Images.length ? <img src={userProfile.Images[0].url} alt='image' className='photoselect' /> : <img src={imageDefault} alt='foto' className='photoselect' />}
      <p>{userProfile.name} {userProfile.lastname}</p>
      <p>Edad:{userProfile.age}</p>
    </div>}

    </div>;
};
export default DetailRestaurant;
