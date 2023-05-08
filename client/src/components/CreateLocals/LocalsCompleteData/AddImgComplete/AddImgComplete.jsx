import './AddImgComplete.css';
import { useEffect, useState } from 'react';
import { IoCreate } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { Loading } from '@nextui-org/react';
import { useUploadImage } from '../../../../hooks/useUploadImage';
import Slider from 'react-slick';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';
import { GrDocumentVerified } from 'react-icons/gr';
import axios from 'axios';
import swal from 'sweetalert';

function AddImgComplete ({ inputs, setInputs, detail, onCloseModalUpdate, setModalUpdate }) {
  const { image, loading, handleChangeimage } = useUploadImage();
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [document, setDocument] = useState({});
  useEffect(() => {
    if (image.length) {
      const data = image.map((data) => {
        return { id: data.id };
      });

      setInputs({ ...inputs, images: data });
    }
  }, [image]);

  useEffect(() => {
    if (document) {
      setInputs({ ...inputs, document });
    }
  }, [document]);

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };

  const hanlderInputDocument = async (e) => {
    try {
      setLoadingDoc(true);
      const formData = new FormData();
      formData.append('document', e.target.files[0]);
      const { data } = await axios.post('/locals/document', formData);
      setDocument(data.newDocument);
      setLoadingDoc(false);
    } catch (error) {
      swal(error.response.data.message, { type: 'error' });
      setLoadingDoc(false);
    }
  };

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <div className='AddImgComplete'>
      <label htmlFor='photo-upload'>
              <h5 className='Add-Img-Basic'>{image.length ? 'Agrega otra imagen' : 'Agrega al menos 3 imágenes del local'}<RiImageAddFill /></h5>
            </label>
            <label htmlFor='photo-upload' className='Label-Img-Add'>
              <input
                className='Basic-File'
                id='photo-upload'
                type='file'
                name='imagen'
                accept='image/png,image/jpeg,image/jpg,image/gif'
                // multiple
                onChange={handleChangeimages}
              ></input>

              {image.length
                ? (<div className='Img-Header'>

                <Slider {...settings}>
                {
                  image?.map(({ url }, index) => {
                    return <div key={index} className='Slide-Img-Carrousel'>
                    <img src={url} alt={`img${index}`} />
                  </div>;
                  })
                }
                </Slider>
                </div>
                  )
                : loading === true
                  ? (
                    <Loading color='primary' className='LoadingImg' />
                    )
                  : (

                    <RiImageAddFill className='LocalesImage' />
                    )}
            </label>
            {detail
              ? <>
                <button type='submit' className='Send-Locals'> Actualizar <IoCreate /></button>
                <button className='Send-Locals' onClick={() => setModalUpdate(false)}> Cerrar </button>
              </>
              : <><label htmlFor='documentInput' className='documentInput'>
                    {loadingDoc === true
                      ? <Loading color="primary" />
                      : document && document.archive
                        ? <h3 className='documentInputText'>Carga exitosa <GrDocumentVerified className='documentInputIcon' /></h3>
                        : <h3 className='documentInputText'>Subir documentación <HiOutlineDocumentArrowUp className='documentInputIcon' /></h3>
                    }
                  </label>
                  <input className='documentInputNone' id='documentInput' type='file' name='document' onChange={hanlderInputDocument} accept='application/pdf'/>
                  <button type='submit' className='Send-Locals'> Crear nuevo local <IoCreate /></button>
                </>
            }
    </div>
  );
}

export default AddImgComplete;
