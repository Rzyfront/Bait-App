import { useState } from 'react';
import axios from 'axios';
import style from "../UserProfile.module.css"

const ChangePassword = ({ id }) => {
  const [passwords, setPassWords] = useState({
    oldPassword: '',
    newPassword: ''
  });

  const handleChangePasswords = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setPassWords({
      ...passwords,
      [property]: value
    });
  };

  const handleSavePassword = async () => {
    try {
      const response = await axios.put('/changePassword',
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        });

      if (response.data.success) {
        alert('Contraseña actualizada con éxito');
      }
    } catch (error) {
      alert(`Hubo Un error ${error.message}`);
    }
  };

  return (
        <div>
            {/* <h4>Cambiar Contraseña</h4>
            <div>
                <input onChange={handleChangePasswords} type='password' name='oldPassword' placeholder='Contraseña Actual' />

            </div>
            <div>
                <input onChange={handleChangePasswords} type='password' name='newPassword' placeholder='Contraseña Nueva' />

            </div>
            <div>
                <button onClick={handleSavePassword}>Cambiar</button>
            </div> */}

        </div>
  );
};

export default ChangePassword;
