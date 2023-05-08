import axios from 'axios';
import { useState } from 'react';

export const useUploadImage = () => {
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChangeimage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setLoading(true);
      axios.post('/images', { image: e.target.result })
        .then(res => {
          setImage([...image, res.data.image]);
        }).catch(err => {
          console.log(err);
        }).finally(() => {
          setLoading(false);
        });
    };
    reader.readAsDataURL(file);
  };
  const handlePhoto = (event) => {
    setLoading(true);
    axios.post('/images', { image: event })
      .then(res => {
        setImage([...image, res.data.image]);
      }).catch(err => {
        console.log(err);
      }).finally(() => {
        setLoading(false);
      });
  };
  return { image, loading, handleChangeimage, handlePhoto };
};
