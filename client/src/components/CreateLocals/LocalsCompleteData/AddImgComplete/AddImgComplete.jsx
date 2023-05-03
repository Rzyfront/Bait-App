import './AddImgComplete.css';
import { useEffect } from 'react';
import { IoCreate } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { Loading } from '@nextui-org/react';
import { useUploadImage } from '../../../../hooks/useUploadImage';
import Slider from 'react-slick';
import { HiOutlineDocumentArrowUp } from 'react-icons/hi2';

function AddImgComplete ({ inputs, setInputs }) {
  const { image, loading, handleChangeimage } = useUploadImage();
  useEffect(() => {
    if (image.length) {
      const data = image.map((data) => {
        return { id: data.id };
      });

      setInputs({ ...inputs, images: data });
    }
  }, [image]);

  const handleChangeimages = (event) => {
    handleChangeimage(event);
  };

  const hanlderInputDocument = async (e) => {

    // MIRAR EL COMPONENTE CLAIMLOCAL PARA COPIAR LA FORMA EN LA QUE SE SUBE EL DOCUMENTO

    // try {
    //   const formData = new FormData();
    //   formData.append('document', e.target.files[0]);
    //   const { data } = await axios.post('/locals/document', formData);
    //   setDocument(data.newDocument);
    // } catch (error) {
    //   swal(error.response.data.message, { type: 'error' });
    // }
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
      <label htmlFor="photo-upload">
              <h5 className='Add-Img-Basic'>{image.length ? 'Agrega otra imagen' : 'Agrega almenos 3 imagenes del local'}<RiImageAddFill /></h5>
            </label>
            <label htmlFor="photo-upload" className='Label-Img-Add'>
              <input
                className='Basic-File'
                id="photo-upload"
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
                    <Loading color="primary" className='LoadingImg' />
                    )
                  : (

                    <RiImageAddFill className='LocalesImage' />
                    )}
            </label>
            <label htmlFor="documentInput" className='documentInput'>
              <h3 className='documentInputText'>Subir documentación</h3><HiOutlineDocumentArrowUp className='documentInputIcon'/>
            </label>
            <input className='documentInputNone' id='documentInput' type="file" name="document" onChange={hanlderInputDocument} accept='application/pdf'/>
            <button type='submit' className='Send-Locals'> Crear nuevo Local <IoCreate /></button>
    </div>
  );
}

export default AddImgComplete;
