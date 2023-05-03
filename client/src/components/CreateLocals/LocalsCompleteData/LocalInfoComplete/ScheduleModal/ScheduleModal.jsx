import './ScheduleModal.css';
import { Input } from '@nextui-org/react';
import { GrClose } from 'react-icons/gr';
function ScheduleModal ({ setShowSchedule, schedulState, setScheduleState }) {
  const handleScheduleChange = (event) => {
    const { alt, name, value } = event.target;
    setScheduleState({
      ...schedulState,
      [alt]: {
        ...schedulState[alt],
        [name]: value
      }
    });
    console.log(schedulState);
  };
  //   tuve un error porque es ves de domingo escribria dogimbo jijiji

  // asigna horarios y mira la consola para ver como se guardan los datos
  return (
    <div className='ScheduleModal-Component'>
        <div className='ScheduleModal-Container'>
            <GrClose className='Close-Shedule' onClick={() => setShowSchedule(false)}/>
            <div className='Schedule-title'>
            <h4>Dia</h4>
            <div className='HourTerms'><h4>Open</h4> <h4>Close</h4></div>
            </div>
            <div className='Selections-Group'>
            <div className='Days'>
                <h5 className={`day ${(schedulState.lunes.open !== '') && 'Hour-ok'}`}>Lunes</h5>
                <h5 className={`day ${(schedulState.martes.open !== '') && 'Hour-ok'}`}>Martes</h5>
                <h5 className={`day ${(schedulState.miercoles.open !== '') && 'Hour-ok'}`}>Miercoles</h5>
                <h5 className={`day ${(schedulState.jueves.open !== '') && 'Hour-ok'}`}>Jueves</h5>
                <h5 className={`day ${(schedulState.viernes.open !== '') && 'Hour-ok'}`}>Viernes</h5>
                <h5 className={`day ${(schedulState.sabado.open !== '') && 'Hour-ok'}`}>Sabado</h5>
                <h5 className={`day ${(schedulState.domingo.open !== '') && 'Hour-ok'}`}>Domingo</h5>
            </div>
            <div className='Hours'>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='lunes'
                className='Input-hours'
                name='open'
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='lunes'
                className='Input-hours'
                name='close'
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='martes'
                className='Input-hours'
                name='open'
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='martes'
                className='Input-hours'
                name='close'
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='miercoles'
                className='Input-hours'
                name='open'
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='miercoles'
                className='Input-hours'
                name='close'
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='jueves'
                className='Input-hours'
                name='open'
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='jueves'
                className='Input-hours'
                name='close'
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='viernes'
                className='Input-hours'
                name='open'
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='viernes'
                className='Input-hours'
                name='close'
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='sabado'
                className='Input-hours'
                name='open'
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='sabado'
                className='Input-hours'
                name='close'
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='domingo'
                className='Input-hours'
                name='open'
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='domingo'
                className='Input-hours'
                name='close'
                onChange={handleScheduleChange}
                />
                </div>
            </div>
            </div>
        </div>
    </div>
  );
}

export default ScheduleModal;
