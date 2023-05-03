import axios from 'axios';
import eliminarTildes from '../../hooks/eliminarTildes.';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const DETAIL = 'DETAIL'; ;
export const createLocal = (inputs) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/locals', {
        // email: inputs.email,
        images: inputs.images,
        location: eliminarTildes(inputs.location.location),
        lat: inputs.location.lat,
        lng: inputs.location.lng,
        name: inputs.name
        // phone: inputs.phone,
        // schedule: inputs.schedule,
        // specialty: inputs.specialty
        // characteristics: chekinputs
      });

      dispatch({
        type: SUCCESS,
        payload: response.data.success
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
};
export const DetailLocal = (id) => {
  return async (dispatch) => {
    try {
      const datos = await axios.get(`/locals/${id}`);
      dispatch({
        type: DETAIL,
        payload: datos.data.locals
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const createLocalFull = (inputs, chekinputs) => {
  return async (dispatch) => {
    try {
      console.log(inputs);
      /*
      const response = await axios.post('/locals', {
        email: inputs.email,
        images: inputs.images,
        location: eliminarTildes(inputs.location.location),
        lat: inputs.location.lat,
        lng: inputs.location.lng,
        name: inputs.name,
        phone: inputs.phone,
        schedule: inputs.schedule,
        specialty: inputs.specialty,
        characteristics: inputs.characteristics
      });

      if (response.status === 201) {
        dispatch({
          type: SUCCESS,
          payload: response.data.success
        });
        return true;
      }*/
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message
      });
      return false;
    }
  };
};
