import axios from 'axios';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';

export const getAllUsers = ({ page = 1, email, role }) => {
  return async (dispatch) => {
    try {
      const query = [];
      if (email)query.push(`&email=${email}`);
      if (role)query.push(`&role=${role}`);

      const { data } = await axios(`/administator/page/${page}?${query.join('')}`);
      return dispatch({ type: GET_ALL_USERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAllReviews = ({ page = 1, verified = 'unVerified' }) => {
  return async (dispatch) => {
    try {
      const { data } = await axios(`/administator/reviews?page=${page}&verified=${verified}`);
      return dispatch({ type: GET_ALL_REVIEWS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
