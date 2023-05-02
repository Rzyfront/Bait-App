import './AddImgComplete.css';
import { useEffect } from 'react';
import { IoCreate } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { Loading } from '@nextui-org/react';
import { useUploadImage } from '../../../../hooks/useUploadImage';
import Slider from 'react-slick';

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
              // image.map((image, i) => (
              // <img
              //   key={i}
              //   src={image.url}
              //   alt='imagen'
              //   className='LocalesImage'
              // />
              // ))
                  )
                : loading === true
                  ? (
                    <Loading color="primary" className='LoadingImg' />
                    )
                  : (

                    <RiImageAddFill className='LocalesImage' />
                    )}
            </label>
            <button type='submit' className='Send-Locals'> Crear nuevo Local <IoCreate /></button>
    </div>
  );
}

export default AddImgComplete;
