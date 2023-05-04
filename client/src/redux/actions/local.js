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
    const schedule = {};
    for (const day in inputs.schedule) {
      schedule[day] = `${inputs.schedule[day].open}${inputs.schedule[day].open ? '-' : ''}${inputs.schedule[day].close}`;
    };
    const characteristics = {};
    if (inputs.characteristics.length) {
      for (const element of inputs.characteristics) {
        characteristics[element] = true;
      }
    };
    if (inputs.payments.length) {
      for (const element of inputs.payments) {
        characteristics[element] = true;
      }
    };
    if (inputs.restaurantType) {
      characteristics.type = inputs.restaurantType;
    };
    try {
      const response = await axios.post('/locals', {
        name: inputs.name,
        location: eliminarTildes(inputs.location.location),
        address: inputs.address,
        email: inputs.email,
        lat: inputs.location.lat,
        lng: inputs.location.lng,
        images: inputs.images,
        document: inputs.document,
        specialty: inputs.specialty,
        schedule,
        characteristics
      });

      if (response.status === 201) {
        dispatch({
          type: SUCCESS,
          payload: response.data.success
        });
        return true;
      }
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message
      });
      return false;
    }
  };
};

export const updateLocalFull = (inputs, detail) => {
  return async (dispatch) => {
    const schedule = {};
    for (const day in inputs.schedule) {
      schedule[day] = `${inputs.schedule[day].open}${inputs.schedule[day].open ? '-' : ''}${inputs.schedule[day].close}`;
    };
    const characteristics = {};
    if (inputs.characteristics.length) {
      for (const element of inputs.characteristics) {
        characteristics[element] = true;
      }
    };
    if (inputs.payments.length) {
      for (const element of inputs.payments) {
        characteristics[element] = true;
      }
    };
    if (inputs.restaurantType) {
      characteristics.type = inputs.restaurantType;
    };
    try {
      const response = await axios.put(`/locals/${detail.id}`, {
        name: inputs.name ?? detail.name,
        location: eliminarTildes(inputs.location.location) ?? detail.location,
        address: inputs.address ?? detail.address,
        email: inputs.email ?? detail.email,
        lat: inputs.location.lat ?? detail.lat,
        lng: inputs.location.lng ?? detail.lng,
        images: inputs.images.length ? inputs.images : detail.images,
        specialty: inputs.specialty.length ? inputs.specialty : detail.specialty,
        schedule: inputs.schedule ? schedule : detail.schedule,
        characteristics: characteristics ?? detail.characteristics
      });

      dispatch({
        type: SUCCESS,
        payload: response.data.success
      });
      return true;
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message
      });
      return false;
    }
  };
};
