import React from 'react';
import { Link } from 'react-router-dom';
const { useContext } = React;
const Navbar = () => {
  let imgUrl = 'https://cdn.worldvectorlogo.com/logos/pokemon-23.svg';

  return (
    <nav>
      <div>
        <Link to="/">
          <img src={imgUrl} alt="pokeapi-logo" className="navbar-image" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
