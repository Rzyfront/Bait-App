import { useEffect, useRef, useState } from 'react';
import './Camara.css';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { MdFlipCameraIos, MdAddAPhoto } from 'react-icons/md';

import html2canvas from 'html2canvas';
const Camara = ({ sendPhotos }) => {
  useEffect(() => {
    setType('user');
  }, []);
  const [type, setType] = useState('user');
  const videoref = useRef(null);
  const [screenshot, setScreenshot] = useState(null);
  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { exact: type }
    },
    audio: false
  })
    .then((stream) => {
      const video = videoref.current;
      video.srcObject = stream;
    })
    .catch((error) => console.log(error));

  const handleCamara = (e) => {
    e.preventDefault();
    if (type === 'environment') {
      setType('user');
    } else {
      setType('environment');
    }
  };
  const handlePhoto = (e) => {
    e.preventDefault();
    const Video = videoref.current;
    html2canvas(Video).then(canvas => {
      const image = canvas.toDataURL();
      setScreenshot(image);
    });
  };
  const deletePhoto = (e) => {
    e.preventDefault();
    setScreenshot(null);
  };

  const send = async (e) => {
    e.preventDefault();
    await sendPhotos(screenshot);
  };
  return (
        <div className='phader'>
           {screenshot ? '' : <video ref={videoref} autoPlay={true} className='camara'/>}
          {screenshot && <div className='camara'>
              <img src={screenshot} alt="captura" />
              <div className='options'>
                  <AiOutlineCheck className='chek' onClick={send}/>
                  <AiOutlineClose className='notchek' onClick={deletePhoto}/>
              </div>
        </div>}
          <div className='options'> {screenshot ? '' : <MdFlipCameraIos onClick={handleCamara} className='cambio' />}
              {screenshot ? '' : <MdAddAPhoto className='cambio' onClick={handlePhoto} />}</div>
        </div>
  );
};

export default Camara;
