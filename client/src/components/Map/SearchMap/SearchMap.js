const apiUrl = 'https://nominatim.openstreetmap.org/search';

const SearchMap = (data) => {
  return fetch(`${apiUrl}?q=${data}&format=json`)
    .then((response) => response.json())
    .then((data) => {
      const latitude = data[0].lat;
      const longitude = data[0].lon;
      return [latitude, longitude];
    })
    .catch((error) => {
      console.log(error);
    });
};
export default SearchMap;
