import axios from 'axios';
export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';
export const SEARCH_BY_FILTERS = 'SEARCH_BY_FILTERS';

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
