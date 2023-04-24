function eliminarTildes (cadena) {
  const tildes = {
    á: 'a',
    é: 'e',
    í: 'i',
    ó: 'o',
    ú: 'u',
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U'
  };

  return cadena.replace(/[áéíóúÁÉÍÓÚ]/g, function (letra) {
    return tildes[letra];
  });
}
export default eliminarTildes;
