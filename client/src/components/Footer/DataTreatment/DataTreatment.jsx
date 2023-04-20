import './DataTreatment.css';
import BaitLogo from '../../../assets/LogoBait.svg';
import { Link } from 'react-router-dom';
function DataTreatment () {
  return (
    <div className="DataTreatment-Component animated-element">
        <div className="DataTreatment-Container">
          <Link to="/home/1?name=&city=">
            <img src={BaitLogo} alt="Bait_Logo" className='BaitLogo'/>
          </Link>
            <h2 className="Title">Política de tratamiento de <span>datos</span> personales - <span>Bait</span></h2>

            <p>En <span>Bait</span>, empresa debidamente constituida y registrada bajo las leyes de [país], nos tomamos muy en serio la privacidad y protección de los datos personales de nuestros usuarios. Es por ello que cumplimos con lo dispuesto en la ley de protección de datos personales en [país], y las normativas que la complementen.</p>

           <p> La presente política tiene como objeto informar a nuestros usuarios cómo se recolectan, tratan, utilizan y protegen sus datos personales.</p>

            <p>Responsable del tratamiento: <span>Bait</span> actúa como responsable del tratamiento de los datos personales de nuestros usuarios y garantiza su debida protección, conforme a los requisitos legales.</p>

            <p>Datos personales recolectados: En <span>Bait</span> recolectamos y almacenamos los siguientes datos personales de nuestros usuarios: nombres y apellidos, correo electrónico, número de teléfono, dirección y ubicación del restaurante, fotografías del restaurante, menú, horarios de atención, datos bancarios y cualquier otra información que el usuario suministre al momento de crear una cuenta o al momento de hacer uso de los servicios que ofrecemos.</p>

            <p>Finalidades del tratamiento: Al aceptar los términos y condiciones de uso de nuestra plataforma, los usuarios nos autorizan expresamente para el tratamiento de sus datos personales con las siguientes finalidades:</p>

            <p>(i) Crear y administrar la cuenta del usuario en nuestra plataforma;<br />
            (ii) Publicar la información del restaurante en nuestra plataforma y permitir su búsqueda por parte de otros usuarios;
            <br />
            (iii) Utilizar la información suministrada para ofrecer servicios y productos relacionados con nuestra plataforma;
            <br />
            (iv) Comunicar y permitir el acceso a los datos personales suministrados a terceros proveedores de servicios de apoyo general y a las personas naturales o jurídicas accionistas de <span>Bait</span>;
            <br />
            (v) Realizar estudios y análisis para el mejoramiento de nuestros servicios y la atención al cliente;
            <br />
            (vi) Realizar actividades de marketing y promoción de nuestros servicios, productos y eventos;
            <br />
            (vii) Cumplir con las obligaciones legales y contractuales adquiridas con nuestros usuarios.</p>

            <p>Transferencia de datos: <span>Bait</span> podrá transferir los datos personales de nuestros usuarios a terceros encargados del tratamiento ubicados dentro o fuera del territorio nacional, siempre y cuando se cumplan con los requisitos legales correspondientes y se garantice la protección de los datos personales.</p>

            <p>Medidas de seguridad: En <span>Bait</span> contamos con las medidas de seguridad necesarias para proteger los datos personales de nuestros usuarios, tales como sistemas de almacenamiento seguros, cifrado de datos, contraseñas de acceso, entre otras.</p>

            <p>Derechos de los titulares: Los titulares de los datos personales recolectados por <span>Bait</span> tienen derecho a conocer, actualizar, rectificar y suprimir sus datos personales, así como a revocar la autorización otorgada para el tratamiento de los mismos. Para ello, los usuarios podrán ejercer sus derechos enviando una solicitud al correo electrónico [correo electrónico de contacto].</p>

            <p>Modificaciones a la política: <span>Bait</span> se reserva el derecho de modificar en cualquier momento la presente política de tratamiento de datos personales. Cualquier modificación será comunicada a los usuarios a través de nuestra plataforma o por medio del correo electrónico registrado en su cuenta.</p>

            <p>Al utilizar los servicios de <span>Bait</span>, el usuario declara conocer y aceptar la presente política de tratamiento de datos personales.</p>

            <p>Además, es importante destacar que la privacidad y seguridad de los datos de los usuarios es una prioridad en <span>Bait</span>. Por esta razón, se adoptarán todas las medidas necesarias para garantizar que los datos de los usuarios estén protegidos y sean tratados de manera responsable y transparente.</p>

            <p>Los datos personales que se recolecten de los usuarios de <span>Bait</span> incluirán, pero no se limitarán a, nombres y apellidos, número de teléfono, dirección de correo electrónico, dirección física y preferencias de búsqueda. Estos datos serán recolectados con el fin de mejorar la experiencia del usuario al utilizar la plataforma, ofrecer recomendaciones de restaurantes y promociones, y para fines de marketing y publicidad.</p>

            <p>Los usuarios tendrán la opción de aceptar o rechazar la autorización de tratamiento de sus datos personales al momento de registrarse en la plataforma. Si el usuario decide aceptar, se entenderá que está dando su consentimiento para que <span>Bait</span> trate sus datos personales de acuerdo con la presente política.</p>

            <p> <span>Bait</span> se compromete a no compartir los datos personales de los usuarios con terceros sin el consentimiento explícito del usuario, salvo en los casos previstos por la ley. Además, <span>Bait</span> tomará todas las medidas necesarias para garantizar que los datos de los usuarios sean almacenados de manera segura y confidencial.</p>

            <p>Los usuarios tendrán derecho a acceder, rectificar y eliminar sus datos personales en cualquier momento. Para hacerlo, podrán hacer una solicitud a través de los canales de atención al cliente de <span>Bait</span>.</p>

            <p>En conclusión, la política de tratamiento de datos de <span>Bait</span> se basará en los principios de transparencia, responsabilidad y seguridad. La privacidad de los datos de los usuarios será una prioridad en todo momento, y se tomarán las medidas necesarias para garantizar que los datos sean tratados de manera responsable y en cumplimiento con la ley.</p>

            <Link to="/home/1?name=&city=">
            <button>Volver</button>
          </Link>
        </div>
    </div>
  );
}

export default DataTreatment;
