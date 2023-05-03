import axios from 'axios';
import swal from 'sweetalert';

export const GET_LOCALS_TO_VERIFY = 'GET_LOCALS_TO_VERIFY';

export const getLocalsToVerify = (page) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/administrator/toVerify${page ? `?page=${page}` : ''}`);
      return dispatch({ type: GET_LOCALS_TO_VERIFY, payload: data.locals });
    } catch (error) {
      console.log(error);
      swal(error.response.data.message);
    }
  };
};
