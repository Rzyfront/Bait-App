import axios from 'axios';
export const DetailDataR = async (id) => {
  const response = await axios.get(`/locals/${id}`);
  return response.data.locals;
};
export const DetailDataU = async (id) => {
  const response = await axios(`/user/${id}`);
  return response.data.user;
};
