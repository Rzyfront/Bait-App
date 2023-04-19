import { Link } from 'react-router-dom';
export default function TYC ({ src, setTerms }) {
  return (
        <>
          <div className='termAndConditions animated-element'>
              <Link to='/home/1?name=&city=' className='LinkLogo'>
                  <img
                      src={src}
                      alt='Bait'
                      className='Logo'
                      width='60px'
                      height='60px'
                  />
              </Link>
              <h2 >Terminos y <span>Condiciones</span></h2>
              <p>Bienvenido a Bait, la plataforma que permite a los usuarios buscar, reservar y reseñar locales y restaurantes. Al utilizar nuestra aplicación móvil, aceptas los siguientes términos y condiciones:</p>

              <p>Registro de usuario: Para utilizar nuestros servicios, debes registrarte como usuario en nuestra aplicación móvil. Debes proporcionar información precisa y actualizada al registrarte. Si descubrimos que has proporcionado información falsa o inexacta, podemos suspender o cerrar tu cuenta.</p>

              <p>Publicación de locales y restaurantes: Bait permite a los dueños de locales y restaurantes publicar información sobre sus negocios en nuestra plataforma. La información proporcionada debe ser precisa y actualizada. Nos reservamos el derecho de rechazar cualquier publicación que no cumpla con nuestros estándares de calidad.</p>

              <p>Reservas y pagos: Bait actúa como intermediario en la reserva de locales y restaurantes. Los usuarios pueden hacer reservas a través de nuestra plataforma y pagar por adelantado. Bait se quedará con un porcentaje acordado de cada reserva realizada a través de nuestra aplicación móvil.</p>

              <p>Reseñas: Los usuarios pueden escribir reseñas sobre los locales y restaurantes en nuestra plataforma. Bait no se hace responsable del contenido de las reseñas, ya que son responsabilidad exclusiva de los usuarios que las escriben. Nos reservamos el derecho de eliminar cualquier reseña que consideremos inapropiada o que no cumpla con nuestros estándares de calidad.</p>

              <p>Planes premium: Los dueños de locales y restaurantes pueden pagar un plan premium para tener más visibilidad en nuestra aplicación móvil. Los planes premium incluyen opciones como destacar su negocio en los resultados de búsqueda y tener acceso a estadísticas detalladas sobre sus reservas.</p>

              <p>Propiedad intelectual: Todos los derechos de propiedad intelectual de nuestra aplicación móvil y su contenido son propiedad exclusiva de Bait. No está permitido copiar, modificar, distribuir o reproducir cualquier parte de nuestra aplicación móvil sin nuestro permiso.</p>

              <p>Limitación de responsabilidad: Bait no se hace responsable de los daños o perjuicios que puedan surgir del uso de nuestra aplicación móvil, incluyendo, entre otros, la pérdida de datos, la interrupción del servicio o la falta de disponibilidad de nuestra aplicación móvil.</p>

              <p>Modificaciones de los términos y condiciones: Bait se reserva el derecho de modificar estos términos y condiciones en cualquier momento. Las modificaciones serán efectivas una vez que se publiquen en nuestra aplicación móvil.</p>

              <p>Ley aplicable y jurisdicción: Estos términos y condiciones se rigen por las leyes del país donde se encuentra Bait. Cualquier disputa relacionada con estos términos y condiciones será resuelta por los tribunales competentes en el lugar donde se encuentra Bait.</p>
              <div className='termsButtons'>
                  <button className='Ok' onClick={() => setTerms(false)}>Aceptar</button>
                  <Link to='/home/1?name=&city='>
                      <button className='No' >Rechazar</button>
                  </Link>
              </div>
          </div>
        </>
  );
}
