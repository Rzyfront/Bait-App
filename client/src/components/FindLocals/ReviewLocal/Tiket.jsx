import { useUploadImage } from '../../../hooks/useUploadImage';
import style from '../FindLocals.module.css';
import { RiImageAddFill } from 'react-icons/ri';
import { useEffect, useState } from 'react';
import { Loading } from '@nextui-org/react';
import Camara from '../Camare';

const Tiket = ({ handleTiket, inputs }) => {
  const [camara, setcamara] = useState(false);
  const { image, loading, handleChangeimage, handlePhoto } = useUploadImage();
  useEffect(() => {
    const data = image[image.length - 1];
    handleTiket(data);
  }, [image]);

  const sendPhotos = async (e) => {
    await handlePhoto(e);
    setcamara(false);
  };
  const activeCamare = (e) => {
    e.preventDefault();
    if (camara === true) {
      setcamara(false);
    } else {
      setcamara(true);
    }
  };
  return <label htmlFor="inputTiketid" className={style.labelInputTiket}>

  <div className={style.tikedUpload}>
      {camara !== true && <div className={style.fileSelect2}>
        <input id='inputTiketid' type="file" className={style.srcFile1} onChange={handleChangeimage} />
      </div>}
      {camara === true && <Camara sendPhotos={sendPhotos} />}
    {loading === true ? <Loading color="primary" className={style.tiketImg} /> : JSON.stringify(inputs.Tiket) !== '{}' ? <img src={inputs.Tiket.url} className={style.tiketImg} /> : <RiImageAddFill className={style.ImgUploadIco} />}
      <div onClick={activeCamare} className={style.sendReview}>camara</div>

    </div>
    </label>;
};
export default Tiket;
