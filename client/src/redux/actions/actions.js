import axios from 'axios';
/// ///names/////////////
export const ORDER = 'ORDER';
export const RESET = 'RESET';
export const COMENTARIE = 'COMENTARIE';
export const HOMEPAGE = 'HOMEPAGE';

// ACTION TYPES MENU - DISH
export const SUCCESS_MENU = 'SUCCESS_MENU';
export const ERROR_MENU = 'ERROR_MENU';
export const GET_MENU = 'GET_MENU';
export const POST_MENU = 'POST_MENU';
export const POST_DISH = 'POST_DISH';
export const SUCCESS_DISH = 'SUCCESS_DISH';
export const ERROR_DISH = 'ERROR_DISH';
export const PUT_DISH = 'PUT_DISH';
export const DELETE_DISH = 'DELETE_DISH';
export const SUCCESS_DEL_DISH = 'SUCCESS_DEL_DISH';
export const ERROR_DEL_DISH = 'ERROR_DEL_DISH';

// ACTION TYPES USER
export const CREATE_USER = 'CREATE_USER';
export const CHECKUSER = 'CHEKUSER';
export const RESETUSER = 'RESETUSER';
export const DETAIL_USER = 'DETAIL_USER';

// ACTION TYPES REVIEWS
export const GET_REVIEWS = 'GET_REVIEWS';
/// ///////actions////////////////////////////
export const reset = () => {
  return {
    type: RESET,
    payload: ''
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
// order and filters and cards
export const order = (data, actions) => {
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
      const response = await axios.post(`/reviews/${id}`, {
        title: inputs.title,
        rating: calculateAverage,
        comment: inputs.comment,
        image: inputs.image,
        food: calificationFood,
        service: calificationService,
        environment: calificationEnvironment,
        qaPrice: calificationQaPrice
      });
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

/* ACTION GENERATORS MENU DISHES */

export const postMenu = (localId, menu) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/menu/${localId}`, menu);
      console.log(response);
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
      console.log(error);
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
export const deleteDish = (dishId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/dishes/${dishId}`);
      if (response.status === 200) {
        dispatch({
          type: SUCCESS_DEL_DISH,
          payload: response.data.success
        });
      }
    } catch (error) {
      dispatch({
        type: ERROR_DEL_DISH,
        payload: error.message
      });
    }
  };
};

export const getMenu = (localId) => {
  return async (dispatch) => {
    try {
      const response = await axios(`locals/${localId}/menu`);
      if (response.status === 200) {
        dispatch({
          type: SUCCESS_MENU,
          payload: response.data.success
        });
        dispatch({
          type: GET_MENU,
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

// USER ACTION GENERATORS
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
// REVIEWS ACTION GENERATORS
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
    } catch (error) {}
  };
};
