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
export const POST_MENU = 'POST_MENU';
export const POST_DISH = 'POST_DISH';
export const CHECKUSER = 'CHEKUSER';
export const RESETUSER = 'RESETUSER';
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
export const createLocal = (inputs) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('/locals', {
        email: inputs.email,
        images: inputs.images,
        location: inputs.location,
        name: inputs.name,
        // phone: inputs.phone,
        schedule: inputs.schedule,
        specialty: inputs.specialty
        // characteristics: chekinputs
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
      console.log(error);
      dispatch({
        type: ERROR,
        payload: error.message
      });
      // set error state to null after 3 seconds
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
  return async (dispatch) => {
    try {
      const res = await axios.post('/login', credentials);
      localStorage.setItem('token', res.data.token);
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
  id

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
      setTimeout(() => {
        dispatch({
          type: SUCCESS_RESET
        });
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const postMenu = (localId, { type }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/menu/${localId}`, type);
      if (response.status === 201) {
        return {
          type: SUCCESS
        };
      }
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message
      });
      // set error state to null after 3 seconds
      setTimeout(() => {
        dispatch({
          type: ERROR_RESET
        });
      }, 3000);
    }
  };
};

export const postDish = (menuId, dish) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/menu/${menuId}`, dish);
      if (response.status === 201) {
        return {
          type: SUCCESS
        };
      }
    } catch (error) {
      dispatch({
        type: ERROR,
        payload: error.message
      });
      // set error state to null after 3 seconds
      setTimeout(() => {
        dispatch({
          type: ERROR_RESET
        });
      }, 3000);
    }
  };
};
export const checkUser = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/login');
      console.log(res.data);
      dispatch({
        type: CHECKUSER,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};
export const ResetUser = () => {
  return async (dispatch) => {
    dispatch({
      type: RESETUSER,
      payload: ''
    });
  };
};
