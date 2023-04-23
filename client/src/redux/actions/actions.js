/* eslint-disable camelcase */
import axios from 'axios';
/// ///names/////////////
export const ORDER = 'ORDER';
export const RESET = 'RESET';
export const COMENTARIE = 'COMENTARIE';
export const CREATE_USER = 'CREATE_USER';
export const HOMEPAGE = 'HOMEPAGE';
export const SUCCESS_MENU = 'SUCCESS_MENU';
export const ERROR_MENU = 'ERROR_MENU';
export const POST_MENU = 'POST_MENU';
export const POST_DISH = 'POST_DISH';
export const SUCCESS_DISH = 'SUCCESS_DISH';
export const ERROR_DISH = 'ERROR_DISH';
export const CHECKUSER = 'CHEKUSER';
export const RESETUSER = 'RESETUSER';
export const SEARCH_BY_FILTERS = 'SEARCH_BY_FILTERS';
export const SAVE_FILTERS = 'SAVE_FILTERS';
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';
export const GET_MENU = 'GET_MENU';
export const GET_REVIEWS = 'GET_REVIEWS';
/// ///////actions////////////////////////////
export const reset = (filter) => {
  return {
    type: RESET,
    payload: filter
  };
};
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

export const searchByQuery = (name, city) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`?name=${name}&location=${city}`);
      const info = response.data;
      return dispatch({ type: SEARCH_BY_QUERY, payload: info });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const searchByFilters = (filter) => {
  const {
    name = '',
    city = '',
    specialty,
    characteristics,
    rating,
    alphabet,
    page
  } = filter;
  return async (dispatch) => {
    try {
      const character = {};
      if (characteristics.length) {
        for (const element of characteristics) {
          character[element] = true;
        }
      };
      const response = await axios.get(
        `/locals/page/${page ?? 1}?name=${name}&location=${city}&specialty=${specialty}&order=${rating || alphabet}&characteristics=${JSON.stringify(character)}`);
      const info = response.data;
      info.filters = filter;
      return dispatch({ type: SEARCH_BY_FILTERS, payload: info });
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
    } catch (error) {
      console.log(error.message);
    }
  };
};
export const postMenu = (localId, menu) => {
  console.log(localId, menu);
  return async (dispatch) => {
    try {
      const response = await axios.post(`/menu/${localId}`, menu);
      if (response.status === 201) {
        dispatch({
          type: SUCCESS_MENU,
          payload: response.data.success
        });
        dispatch({
          type: POST_MENU,
          payload: response.data.menu
        });
      }
    } catch (error) {
      dispatch({
        type: ERROR_MENU,
        payload: error.message
      });
    }
  };
};

export const postDish = (menuId, dish) => {
  dish = {
    ...dish,
    price: Number(dish.price)
  };
  console.log(dish);
  return async (dispatch) => {
    try {
      const response = await axios.post(`/dishes/${menuId}`, dish);
      if (response.status === 201) {
        dispatch({
          type: SUCCESS_DISH,
          payload: response.data.success
        });
      }
    } catch (error) {
      dispatch({
        type: ERROR_DISH,
        payload: error.message
      });
    }
  };
};

export const getMenu = (localId) => {
  return async (dispatch) => {
    try {
      const response = await axios(`/menu/${localId}`);
      if (response.status === 200) {
        dispatch({
          type: SUCCESS_MENU,
          payload: response.data.success
        });
        dispatch({
          type: GET_MENU,
          payload: response.data
        });
      }
    } catch (error) {
      dispatch({
        type: ERROR_MENU,
        payload: error.message
      });
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

export const getReviews = (localId, page = 1) => {
  return async (dispatch) => {
    try {
      const response = await axios(`/reviews/${localId}?page=${page}`);
      if (response.status === 200) {
        dispatch({
          type: GET_REVIEWS,
          payload: response.data.reviews
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};
