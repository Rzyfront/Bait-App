import './CreateLocals.css';
import { useState, useEffect } from 'react';
import { Tyc, LocalsDatabasic, LocalsCompleteData } from '../components';

function CreateLocals () {
  const [formType, setFormType] = useState('NoSelection');
  const [termsAndConditions, setTemsAndConditions] = useState(false);

  useEffect(() => {
    // Si la URL actual contiene la ancla '#complete-form', cambia el estado formType a 'LocalsCompleteData'
    if (window.location.hash === '#complete-form') {
      setFormType('LocalsCompleteData');
    }
  }, []);

  return (
    <div className='Create-Locals-Form animated-element'>
        {!termsAndConditions
          ? <Tyc setTemsAndConditions={setTemsAndConditions} />
          : ((formType === 'NoSelection' || formType === 'UserForm')
              ? <LocalsDatabasic setFormType={setFormType} formType={formType}/>
              : <LocalsCompleteData/>
            )
        }

    </div>
  );
}

export default CreateLocals;
