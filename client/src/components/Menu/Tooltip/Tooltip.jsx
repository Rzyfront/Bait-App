import { useState } from 'react';

export default function Tooltip ({ children, text }) {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };

  return (
        <div className="Menu-icon-wrapper">
            {show && <div className="Menu-edit-tooltip">{text}</div>}
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </div>
        </div>
  );
}
