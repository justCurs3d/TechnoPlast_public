import React from 'react'
import './Toggle.css'

function Toogle({isOlivir, setIsOlivir}) {
    return (
        <div className="toogle d-flex ml-50">
          <div onClick={() => setIsOlivir(false)} className={`leftToogle ${isOlivir? '' : 'left_active'}`}>ТехноПласт</div>
          <div onClick={() => setIsOlivir(true)} className={`rightToogle ${isOlivir? 'right_active' : ''}`}>Olivir</div>
        </div>
    )
}

export default Toogle
