import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';
import logo from '../../assets/logo.png'



function NavBar() {
    
    const [active, setActive] = useState('')
   

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__logo">
                    <Link
                    to={'/'}
                    onClick={() => setActive('')}
                    >
                        <img src={logo} alt="Логотип" className="navigation__logo-image" />
                    </Link>
                </li>
                {/* <li className="navigation__item">
                    <Link
                     to={'/sborka'} 
                     className={active == 'sborka' ? "navigation__link active" : "navigation__link"}
                     onClick={() => setActive('sborka')}
                    >
                        Собрать заказы
                    </Link>
                </li>
                <li className="navigation__item">
                    <Link 
                    to={'/priemka'} 
                    className={active == 'priemka' ? "navigation__link active" : "navigation__link"}
                    onClick={() => setActive('priemka')}
                    >
                        Приемка товра
                    </Link>
                </li> */}
            </ul>
        </nav>
    );
}

export default NavBar;