import './PopComent.css';

function PopComent ({ text }) {
  return (
   <div className="popover-container">
  <div className="popover-arrow"></div>
  <div className="popover-body">
    <p className='popcoment-text'>{text}</p>
  </div>
</div>

  );
}

export default PopComent;
