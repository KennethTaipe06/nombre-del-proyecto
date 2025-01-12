import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; // Importar el archivo CSS
import { AuthContext } from '../AuthContext'; // Importar el contexto de autenticación

const Navbar = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/profile" className="navbar-link">Profile</Link>
      <button className="navbar-link logout-button" onClick={handleLogout}>Log Out</button>
    </nav>
  );
};

export default Navbar;
