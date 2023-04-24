export const path = (id, name, city, { specialty, characteristics, rating, alphabet, order }) => {
  let pathFilters = `/home/${id}?name=${name}&city=${city}`;
  if (specialty) {
    pathFilters = pathFilters + `&specialty=${specialty}`;
  };
  if (rating || alphabet || order) {
    pathFilters = pathFilters + `&order=${rating || alphabet}`;
  };
  if (characteristics) {
    const allChar = characteristics.map((e) => `&characteristics[]=${e}`);
    pathFilters = pathFilters + allChar.join('');
  };
  return pathFilters;
};
