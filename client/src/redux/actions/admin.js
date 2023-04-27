import axios from 'axios';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
export const VERIFY_REVIEWS = 'VERIFY_REVIEWS';
export const CHANGE_ROLE = 'CHANGE_ROLE';
export const SUSPEND_USER = 'SUSPEND_USER';
export const ASSIGN_LOCAL = 'ASSIGN_LOCAL';
export const REVIEW_DETAIL = 'REVIEW_DETAIL';
export const GETLOCALSADMIN = 'GETLOCALSADMIN';
export const getAllUsers = (filter) => {
  return async (dispatch) => {
    try {
      const query = [];
      if (filter.email)query.push(`&email=${filter.email}`);
      if (filter.role)query.push(`&role=${filter.role}`);
      const { data } = await axios(`/administrator/page/${filter.page}?${query.join('')}`);
      dispatch({ type: GET_ALL_USERS, payload: data });
    } catch (error) {
      dispatch({ type: GET_ALL_USERS, payload: {} });
    }
  };
};

export const getAllReviews = ({ page = 1, verified = 'unVerified' }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/administrator/reviews?page=${page}&verified=${verified}`);
      return dispatch({ type: GET_ALL_REVIEWS, payload: data });
    } catch (error) {
      console.log(error);
      window.alert('why not?');
    }
  };
};

export const createAdmin = async ({ id }) => {
  try {
    const { data } = await axios.put(`/administrator/createAdmin/${id}`);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const verifyReview = ({ id, verified }) => async (dispatch) => {
  try {
    //                                                    Una Review puede ser verificada, no verificada o archivada
    //                                                    Este endpoint por default la verfica, pero se le puede enviar por
    //                                                    Query 'archived' o 'unVerified' c:
    const { data } = await axios.patch(`/administrator/review/${id}${verified ? `?verified=${verified}` : ''}`);
    // TODO agregar el estado a redux y el switches
    return dispatch({ type: VERIFY_REVIEWS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const changeRole = ({ id, role }) => async (dispatch) => {
  try {
    console.log(id, role);
    const { data } = await axios.patch(`/administrator/role/${id}`, { role });
    return dispatch({ type: CHANGE_ROLE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const suspendUser = ({ id }) => async (dispatch) => {
  try {
    const { status } = await axios.patch(`/administrator/suspend/${id}`);
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const getReviewDetail = (detail) => {
  try {
    return { type: REVIEW_DETAIL, payload: detail };
  } catch (err) {
    console.log(err);
  }
};
/// // locals
export const getAllLocal = (page, caracters) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/locals/page/${page}?&${caracters}`);
      const info = response.data;
      return dispatch({ type: GETLOCALSADMIN, payload: info });
    } catch (error) {
      return dispatch({ type: GETLOCALSADMIN, payload: {} });
    }
  };
};
export const deleteLocal = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/locals/${id}`);
    } catch (error) {
      return true;
    }
  };
};
export const assignLocal = ({ userId, localId }) => async (dispatch) => {
  try {
    const { data } = await axios.put('/administrator/assignLocal', { userId, localId });
    console.log('paso');
    return dispatch({ type: SUSPEND_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
