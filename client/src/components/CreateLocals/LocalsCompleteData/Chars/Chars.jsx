export default function Chars ({ chekinputs, handleCheck }) {
  return (
    <>
      <legend>Características:</legend>
      <label htmlFor='wifi'>
        <input
          type='checkbox'
          onChange={handleCheck}
          name='wifi'
          checked={chekinputs.wifi}
        />
        Wifi
      </label>
      <label htmlFor='parking_lot'>
        <input
          type='checkbox'
          onChange={handleCheck}
          name='parking_lot'
          checked={chekinputs.parking_lot}
        />
        Estacionamiento
      </label>
            <label htmlFor='outdoor_seating'>
                <input
                    type='checkbox'
                    name='outdoor_seating'
                    checked={chekinputs.outdoor_seating}
                    onChange={handleCheck}
                />
                Asientos exteriores
            </label>
            <label htmlFor='live_music'>
                <input
                    type='checkbox'
                    name='live_music'
                    checked={chekinputs.live_music}
                    onChange={handleCheck}
                />
                Música
            </label>
            <label htmlFor='table_service'>
                <input
                    type='checkbox'
                    name='table_service'
                    checked={chekinputs.table_service}
                    onChange={handleCheck}
                />
                Servicio de mesa
            </label>
            <label htmlFor='family_style'>
                <input
                    type='checkbox'
                    name='family_style'
                    checked={chekinputs.family_style}
                    onChange={handleCheck}
                />
                Estilo familiar
            </label>
            <label htmlFor='romantic'>
                <input
                    type='checkbox'
                    name='romantic'
                    checked={chekinputs.romantic}
                    onChange={handleCheck}
                />
                Estilo romántico
            </label>
            <label htmlFor='big_group'>
                <input
                    type='checkbox'
                    name='big_group'
                    checked={chekinputs.big_group}
                    onChange={handleCheck}
                />
                Grupos grandes
            </label>
            <label htmlFor='work_friendly'>
                <input
                    type='checkbox'
                    name='work_friendly'
                    checked={chekinputs.work_friendly}
                    onChange={handleCheck}
                />
                Ambiente relajante
            </label>
            <label htmlFor='pet_friendly'>
                <input
                    type='checkbox'
                    name='pet_friendly'
                    checked={chekinputs.pet_friendly}
                    onChange={handleCheck}
                />
                Mascotas
            </label>
        </>
  );
}
