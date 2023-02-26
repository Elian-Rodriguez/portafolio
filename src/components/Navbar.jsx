import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="Navbar">
       <ul>
          <li><a href="#introduction">Introducción</a></li>
          <li><a href="#skills">Habilidades</a></li>
          <li><a href="#projects">Proyectos</a></li>
          <li><a href="#experience">Experiencia</a></li>
          <li><a href="#education">Educación</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
    </nav>
  );
}

export default Navbar;