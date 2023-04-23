import reverseGeoCoding from '../../components/Map/SearchMap/reverseGeocoding';
const UBICATIONDATA = 'UBICATIONDATA';
export const ubicationPagine = (lat, lng) => {
  return async (dispatch) => {
    try {
      const data = await reverseGeoCoding(lat, lng);
      console.log(data);
      dispatch({
        type: UBICATIONDATA,
        payload: data
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
