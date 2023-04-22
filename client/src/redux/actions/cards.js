export const SEARCH_BY_QUERY = 'SEARCH_BY_QUERY';
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