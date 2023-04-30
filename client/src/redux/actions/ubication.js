
export const UBICATIONDATA = 'UBICATIONDATA';
export const FOCO = 'FOCO';
export const ubicationPagine = (data) => {
  if (data.lat && data.lng && data.city) {
    return {
      type: UBICATIONDATA,
      payload: data
    };
  }
};
export const foco = (data) => {
  if (data.lat && data.lng) {
    return {
      type: FOCO,
      payload: data
    };
  }
};
