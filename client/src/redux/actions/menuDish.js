import axios from 'axios';

// ACTION TYPES MENU
export const SUCCESS_MENU = 'SUCCESS_MENU';
export const ERROR_MENU = 'ERROR_MENU';
export const GET_MENU = 'GET_MENU';
export const POST_MENU = 'POST_MENU';

// ACTION TYPES DISH
export const POST_DISH = 'POST_DISH';
export const SUCCESS_DISH = 'SUCCESS_DISH';
export const ERROR_DISH = 'ERROR_DISH';
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
      console.log(error);
    }
  };
};

export const deleteMenu = (menuId) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`locals/menu/${menuId}`);
      if (response.status === 201) {
        dispatch({
          type: SUCCESS_MENU,
          payload: response.data.success
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ERROR_MENU,
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

export const putDish = (dishId, dish) => {
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
      dispatch({
        type: ERROR_DISH,
        payload: error.message
      });
    }
  };
};
