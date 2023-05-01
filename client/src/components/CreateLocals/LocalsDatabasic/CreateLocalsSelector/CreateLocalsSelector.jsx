import './CreateLocalsSelector.css';

function CreateLocalsSelector ({ setFormType }) {
  return (
    <div className="CreateLocalsSelector">
        <div className="CreateLocalsSelector-Container">
            <h2 className="Title">¿Por qué quieres <span>inscribir</span> un nuevo <span>local</span>?</h2>
            <p>Queremos saber si eres un un <span>usuario</span> que inscribe un local para reseñarlo o si eres un <span>propietario</span> que quiere trabajar con nosotros.</p>
            <div className="CreateLocalsSelector-ButtonGroup">
            <button className="Button1" onClick={() => setFormType('UserForm')}>Soy usuario</button>
            <button className="Button2" onClick={() => setFormType('OwnerForm')}>Soy propietario</button>
            </div>
        </div>
    </div>
  );
}

export default CreateLocalsSelector;
