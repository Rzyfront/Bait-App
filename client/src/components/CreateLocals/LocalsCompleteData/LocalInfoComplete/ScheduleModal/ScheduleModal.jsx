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
  };
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
                <h5 className={`day ${(schedulState.monday.open !== '') && 'Hour-ok'}`}>Lunes</h5>
                <h5 className={`day ${(schedulState.tuesday.open !== '') && 'Hour-ok'}`}>Martes</h5>
                <h5 className={`day ${(schedulState.wednesday.open !== '') && 'Hour-ok'}`}>Miercoles</h5>
                <h5 className={`day ${(schedulState.thursday.open !== '') && 'Hour-ok'}`}>Jueves</h5>
                <h5 className={`day ${(schedulState.friday.open !== '') && 'Hour-ok'}`}>Viernes</h5>
                <h5 className={`day ${(schedulState.saturday.open !== '') && 'Hour-ok'}`}>Sabado</h5>
                <h5 className={`day ${(schedulState.sunday.open !== '') && 'Hour-ok'}`}>Domingo</h5>
            </div>
            <div className='Hours'>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='monday'
                className='Input-hours'
                name='open'
                value= {schedulState.monday.open}
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='monday'
                className='Input-hours'
                name='close'
                value= {schedulState.monday.close}
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='tuesday'
                className='Input-hours'
                name='open'
                value= {schedulState.tuesday.open}
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='tuesday'
                className='Input-hours'
                name='close'
                value= {schedulState.tuesday.close}
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='wednesday'
                className='Input-hours'
                name='open'
                value= {schedulState.wednesday.open}
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='wednesday'
                className='Input-hours'
                name='close'
                value= {schedulState.wednesday.close}
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='thursday'
                className='Input-hours'
                name='open'
                value= {schedulState.thursday.open}
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='thursday'
                className='Input-hours'
                name='close'
                value= {schedulState.thursday.close}
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='friday'
                className='Input-hours'
                name='open'
                value= {schedulState.friday.open}
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='friday'
                className='Input-hours'
                name='close'
                value= {schedulState.friday.close}
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='saturday'
                className='Input-hours'
                name='open'
                value= {schedulState.saturday.open}
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='saturday'
                className='Input-hours'
                name='close'
                value= {schedulState.saturday.close}
                onChange={handleScheduleChange}
                />
                </div>
                <div className='Open-Close'>
                    <Input
                width="60px"
                label="Time"
                type="time"
                alt='sunday'
                className='Input-hours'
                name='open'
                value= {schedulState.sunday.open}
                onChange={handleScheduleChange}
                />
                <Input
                width="60px"
                label="Time"
                type="time"
                alt='sunday'
                className='Input-hours'
                name='close'
                value= {schedulState.sunday.close}
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
