import './CreateLocals.css';
import { useState } from 'react';
import { Tyc, LocalsDatabasic, LocalsCompleteData } from '../components';

function CreateLocals () {
  const [formType, setFormType] = useState('NoSelection');
  const [termsAndConditions, setTemsAndConditions] = useState(false);

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
