import axios from 'axios';
/// ///names/////////////
export const ORDER = 'ORDER';
export const RESET = 'RESET';
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';
export const DETAIL = 'DETAIL';
export const COMENTARIE = 'COMENTARIE';
export const CREATE_USER = 'CREATE_USER';
export const HOMEPAGE = 'HOMEPAGE';
export const SUCCESS = 'SUCCESS';
export const ERROR = 'ERROR';
export const SUCCESS_RESET = 'SUCCESS_RESET';
export const ERROR_RESET = 'ERROR_RESET';

/// ///////actions////////////////////////////
export const reset = () => {
  return {
    type: RESET,
    payload: ''
  };
};
/// loadinglocals

/// Create user
export const createUser = ({
  name,
  lastname,
  age,
  phone_number,
  email,
  password,
  location,
  verified,
  isActive,
  role
}) => {
  return async (dispatch) => {
    try {
      await axios.post('http://localhost:3001/user', {
        name,
        lastname,
        age: Number(age),
        phone_number,
        email,
        password,
        location,
        verified,
        isActive,
        role
      });
      return dispatch({
        type: CREATE_USER,
        payload: 'Usuario Creado Correctamente'
      });
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };
};
// Detail id
export const DetailLocal = (id) => {
  return async (dispatch) => {
    try {
      const datos = await axios.get(`/locals/${id}`);
      dispatch({
        type: DETAIL,
        payload: datos.data
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

// correguir imagen cuando este listo la ruta
export const createLocal = (inputs, chekinputs) => {
  const images = [];
  inputs.imagen.forEach((data) => {
    images.push({ id: data.id });
  });
  return async (dispatch) => {
    try {
      const response = await axios.post('/locals', {
        inputs,
        images,
        characteristics: {
          wifi: chekinputs.wifi,
          parking_lot: chekinputs.parking_lot,
          outdoor_seating: chekinputs.outdoor_seating,
          live_music: chekinputs.live_music,
          table_service: chekinputs.table_service,
          family_style: chekinputs.family_style,
          romantic: chekinputs.romantic,
          big_group: chekinputs.big_group,
          work_friendly: chekinputs.work_friendly,
          pet_friendly: chekinputs.pet_friendly
        }
      });
      if (response.status === 201) {
        dispatch({
          type: SUCCESS,
          payload: response.data.success
        });
        setTimeout(() => {
          dispatch({
            type: SUCCESS_RESET
          });
        }, 3000);
      }
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message
      });
      // set error state to null after 5 seconds
      setTimeout(() => {
        dispatch({
          type: ERROR_RESET
        });
      }, 3000);
    }
  };
};

// order and filters and cards
export const order = (data, actions) => {
  console.log(data);
  const datas = data.flat();
  switch (actions) {
    case 'best':
      for (let j = 0; j < datas.length; j++) {
        for (let i = 0; i < datas.length - 1; i++) {
          if (datas[i + 1].rating > datas[i].rating) {
            const auxiliar = datas[i];
            datas[i] = datas[i + 1];
            datas[i + 1] = auxiliar;
          }
        }
      }
      return {
        type: ORDER,
        payload: datas
      };
    case 'A-Z':
      const az = datas.sort((a, b) => a.name.localeCompare(b.name));
      return {
        type: ORDER,
        payload: az
      };
    case 'Z-A':
      const za = datas.sort((a, b) => b.name.localeCompare(a.name));
      return {
        type: ORDER,
        payload: za
      };

    default:
      break;
  }
  // adgorithm aordering
};
export const searchByQuery = (name, city) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/locals?name=${name}&location=${city}`);
      const info = response.data;
      return dispatch({ type: SEARCH_BY_QUERY, payload: info });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logIn = (credentials) => {
  console.log('haciendo dispatch');
  return async (dispatch) => {
    try {
      const res = await axios.post('/login', credentials);
      localStorage.setItem('user', JSON.stringify(res.data));
      location.reload();
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const comentarie = (
  calificationFood,
  calificationQaPrice,
  calificationEnvironment,
  calificationService,
  calculateAverage,
  inputs,
  id,
  userToken
) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/reviews/${id}`,
        {
          title: inputs.title,
          rating: calculateAverage,
          comment: inputs.comment,
          image: inputs.image,
          food: calificationFood,
          service: calificationService,
          environment: calificationEnvironment,
          qaPrice: calificationQaPrice
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`, // Aquí agregas tu header personalizado
            'Content-Type': 'application/json' // También puedes agregar otros headers estándar
          }
        }
      );
      console.log(response.data); // Aquí puedes hacer algo con la respuesta del servidor
    } catch (error) {
      console.log(error);
    }
  };
};
/// / home pages
export const homepage = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/locals/page/${id}`);
      dispatch({
        type: HOMEPAGE,
        payload: response.data
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
