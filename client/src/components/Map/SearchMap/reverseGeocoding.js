
const GEOCODE_URL = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&langCode=EN&location=';

const reverseGeoCoding = async (lng, lat) => {
  const data = await (await fetch(GEOCODE_URL + `${lng},${lat}`)).json();
  return data;
};
export default reverseGeoCoding;
