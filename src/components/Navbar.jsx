import '../scss/Navigation.scss'

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {

  const [ isMenuOpen, setIsMenuOpen ] = useState( false );

  const handleClickHamburgerMenu = () => setIsMenuOpen( !isMenuOpen )

  const closeMenu = () => setIsMenuOpen( false );


  return (
    <header className="container-fluid " id="navigation">
      <nav className="container-fluid " id="navbar">
        <ul className={ isMenuOpen ? "navbar__menu active" : "navbar__menu" }>
          <li>
            <NavLink to="/" onClick={ closeMenu } >
              Cocktails by Ingredients
            </NavLink>
          </li>
          
        </ul>

        <div id="hamburger" onClick={ handleClickHamburgerMenu }>
          { isMenuOpen ? <FaTimes size={ 30 } /> : <FaBars size={ 30 } /> }
        </div>

      </nav>
    </header>
  );


}
export default Navbar;