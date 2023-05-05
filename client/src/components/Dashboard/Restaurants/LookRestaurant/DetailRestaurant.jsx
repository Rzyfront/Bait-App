import Chart from '../../../../hooks/Chart';
import { useEffect, useState } from 'react';
import './DetailRestaurant.css';
import imageDefault from '../../../../assets/imagenDefault.png';
import { DetailDataR, DetailDataU } from './DetailDataR';
import { AiOutlineClose } from 'react-icons/ai';

const DetailRestaurant = ({ id, handleDetail }) => {
  const [localData, setLocaldata] = useState();
  const [userData, setUserdata] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const loadingData = async () => {
      const data = await DetailDataR(id);
      setLocaldata(data);
    };
    loadingData();
  }, []);
  useEffect(() => {
    const loadingData = async () => {
      const data = await DetailDataU(localData.UserId);
      setUserdata(data);
    };

    if (localData && localData.verified === 'verified') {
      loadingData();
    }
    if (localData && localData.avgEnvironment) {
      const data = [{ name: 'Ambiente', Calificacion: parseFloat(localData.avgEnvironment).toFixed(1) }, { name: 'Comida', Calificacion: parseFloat(localData.avgFood).toFixed(1) }, { name: 'Precio', Calificacion: parseFloat(localData.avgQaPrice).toFixed(1) }, { name: 'Servicio', Calificacion: parseFloat(localData.avgService).toFixed(1) }];
      setData(data);
    }
  }, [localData]);
  return <div className='detailRestaurantContainer'>
    <h4 className='rating-modal-title'>Rating promedio por categoría</h4>
    <button onClick={handleDetail} className='dash-res-close-modal'><AiOutlineClose/></button>
       <div className='localDetail'>
      {localData && localData.avgEnvironment && <Chart data={data} />}
      <div className='graph1'>
      </div>
      {localData && localData.location && <p>{localData?.location}</p>}
      </div>
    {localData && localData.verified === 'verified' && <div className='userDetail'>
      {userData && userData.Image ? <img src={userData.Image.url} alt='image' className='photoselect' /> : <img src={imageDefault} alt='foto' className='photoselect' />}
      {userData && userData.name && userData.lastname && <p>{userData.name} {userData.lastname}</p>}
      {userData && userData.age && <p>Edad:{userData.age}</p>}
    </div>}

    </div>;
};
export default DetailRestaurant;
