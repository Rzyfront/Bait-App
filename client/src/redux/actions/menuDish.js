import axios from 'axios';
import swal from 'sweetalert';

// ACTION TYPES MENU
export const SUCCESS_MENU = 'SUCCESS_MENU';
export const SUCCESS_DEL = 'SUCCESS_DEL';
export const SUCCESS_GET_MENU = 'SUCCESS_GET_MENU';
export const GET_MENU = 'GET_MENU';
export const POST_MENU = 'POST_MENU';
export const PUT_MENU = 'PUT_MENU';

// ACTION TYPES DISH
export const POST_DISH = 'POST_DISH';
export const GET_DISH = 'GET_DISH';
export const SUCCESS_DISH = 'SUCCESS_DISH';
export const ERROR_DISH = 'ERROR_DISH';
export const RESET_DISH = 'RESET_DISH';
export const PUT_DISH = 'PUT_DISH';
export const DELETE_DISH = 'DELETE_DISH';
export const SUCCESS_DEL_DISH = 'SUCCESS_DEL_DISH';
export const ERROR_DEL_DISH = 'ERROR_DEL_DISH';

/* ACTION GENERATORS MENU */

export const postMenu = (localId, menu) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/locals/${localId}/menu`, menu);
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
        type: SUCCESS_MENU,
        payload: false
      });
    }
  };
};

export const deleteMenu = (menuId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`locals/menu/${menuId}`);
      if (response.status === 201) {
        dispatch({
          type: SUCCESS_DEL,
          payload: response.data.success
        });
      }
    } catch (error) {
      dispatch({
        type: SUCCESS_DEL,
        payload: false
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
          type: GET_MENU,
          payload: response.data.menu
        });
        dispatch({
          type: SUCCESS_GET_MENU,
          payload: response.data.success
        });
      }
    } catch (error) {
      dispatch({
        type: SUCCESS_GET_MENU,
        payload: false
      });
    }
  };
};

/* ACTION GENERATORS DISHES */

export const postDish = (menuId, dish) => {
  dish = {
    ...dish,
    price: Number(dish.price)
  };

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
      console.log(error);
      dispatch({
        type: ERROR_DISH,
        payload: error.message
      });
    }
  };
};

export const getDish = async (dishId) => {
  try {
    const response = await axios(`/dishes/${dishId}`);
    if (response.status === 201) {
      const { Image, ...dish } = response.data.dish;
      return { ...dish, image: Image };
    }
  } catch (error) {
    swal('Ocurrió un error');
  }
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

export const putDish = (dishId, dish) => {
  dish = {
    ...dish,
    image: { id: dish.image.id || dish.Image.id, url: 'url' },
    price: Number(dish.price)
  };
  return async (dispatch) => {
    try {
      const response = await axios.put(`/dishes/${dishId}`, dish);
      if (response.status === 200) {
        dispatch({
          type: SUCCESS_DISH,
          payload: response.data.success
        });
      }
    } catch (error) {
      console.log(error);
      swal('Ocurrió un error');
    }
  };
};
