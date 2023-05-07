import { useUploadImage } from '../../../hooks/useUploadImage';
import style from '../FindLocals.module.css';
import { RiImageAddFill } from 'react-icons/ri';
import { useEffect } from 'react';
import { Loading } from '@nextui-org/react';
const Tiket = ({ handleTiket, inputs }) => {
  const { image, loading, handleChangeimage } = useUploadImage();
  useEffect(() => {
    const data = image[image.length - 1];
    handleTiket(data);
  }, [image]);

  return <label htmlFor="inputTiketid" className={style.labelInputTiket}>

  <div className={style.tikedUpload}>
      <div className={style.fileSelect2}>
          <input id='inputTiketid' type="file" className={style.srcFile1} onChange={handleChangeimage} />
      </div>
    {loading === true ? <Loading color="primary" className={style.tiketImg} /> : JSON.stringify(inputs.Tiket) !== '{}' ? <img src={inputs.Tiket.url} className={style.tiketImg} /> : <RiImageAddFill className={style.ImgUploadIco} />}
    </div>
    </label>;
};
export default Tiket;
