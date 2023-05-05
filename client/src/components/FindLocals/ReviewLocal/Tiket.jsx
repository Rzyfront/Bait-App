import { useUploadImage } from '../../../hooks/useUploadImage';
import style from '../FindLocals.module.css';
import { useEffect } from 'react';
import { Loading } from '@nextui-org/react';
const Tiket = ({ handleTiket, inputs }) => {
  const { image, loading, handleChangeimage } = useUploadImage();
  useEffect(() => {
    const data = image[image.length - 1];
    handleTiket(data);
  }, [image]);

  return <div className={style.imgUpload}>
      <div className={style.fileSelect2}>
          <input type="file" className={style.srcFile1} onChange={handleChangeimage} />
      </div>
    {loading === true ? <Loading color="primary" className={style.img} /> : JSON.stringify(inputs.Tiket) !== '{}' ? <img src={inputs.Tiket.url} className={style.img} /> : <img className={style.img} src="https://res.cloudinary.com/dirsusbyy/image/upload/v1680389194/ppex43qn0ykjyejn1amk.png" />}

    </div>;
};
export default Tiket;
