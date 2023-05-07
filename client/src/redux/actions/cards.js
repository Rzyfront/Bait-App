import axios from 'axios';
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';
export const SEARCH_BY_FILTERS = 'SEARCH_BY_FILTERS';
export const SAVE_SEARCH_HOME = 'SAVE_SEARCH_HOME';
export const SAVE_FILTER_HOME = 'SAVE_FILTER_HOME';

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

export const searchByFilters = ({ page = 1, filter }) => {
  console.log(`/locals/page/${page ?? 1}?${filter}`);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `/locals/page/${page ?? 1}?${filter}`);
      const info = response.data;
      return dispatch({ type: SEARCH_BY_FILTERS, payload: info });
    } catch (error) {
      console.log(error.message);
      return dispatch({ type: SEARCH_BY_FILTERS, payload: [] });
    }
  };
};

export const saveInfoSearchHome = (info) => {
  return async (dispatch) => {
    try {
      return dispatch({ type: SAVE_SEARCH_HOME, payload: info });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const saveFilter = (data) => {
  return async (dispatch) => {
    try {
      return dispatch({ type: SAVE_FILTER_HOME, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
};
