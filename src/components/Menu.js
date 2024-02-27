import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos de Font Awesome
import LogotipoBarbacoa from '../images/LogotipoBarbacoa.jpg'; // Importar la imagen

const Menu = () => {
  return (
    <div className='container' style={{ backgroundColor: '#F6E7CA' }}> {/* Agregamos un color de fondo al contenedor principal */}
      <div className='row'>
        <div className='col' style={{ textAlign: 'center', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px' }}>
          <h1 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontSize: '28px', fontWeight: 'bold', color: '#333' }}>Bienvenido</h1>
          <img 
            src={LogotipoBarbacoa}  // Usamos la imagen importada
            alt="Imagen de barbacoa" 
            style={{ display: 'block', margin: 'auto', marginBottom: '20px', maxWidth: '100%', width: '300px', borderRadius: '10px' }}
          />
          <div className="d-flex justify-content-center">
            {/* Enlace a la sección de lugares de barbacoa */}
            <Link 
              to="/show" 
              className='btn btn-secondary me-2' 
              style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                padding: '10px 20px', 
                textDecoration: 'none', 
                color: '#000', 
                backgroundColor: '#ffea00', // Amarillo
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                transition: 'background-color 0.3s',
              }}
            >
              <FontAwesomeIcon icon={faUtensils} className="me-2" />Lugares de Barbacoa en Cadereya
            </Link>
            {/* Enlace a la sección de usuarios */}
            <Link 
              to="/showU" 
              className='btn btn-secondary me-2' 
              style={{ 
                fontSize: '18px',
                fontWeight: 'bold', 
                padding: '10px 20px', 
                textDecoration: 'none', 
                color: '#000', 
                backgroundColor: '#6fff00', // Verde
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                transition: 'background-color 0.3s',
              }}
            >
              <FontAwesomeIcon icon={faUsers} className="me-2" />Usuarios registrados en la app
            </Link>
            {/* Enlace a la sección de eventos */}
            <Link 
              to="/show-events" 
              className='btn btn-secondary' 
              style={{ 
                fontSize: '18px',
                fontWeight: 'bold', // Texto en negrita 
                padding: '10px 20px', 
                textDecoration: 'none', 
                color: '#000', 
                backgroundColor: '#2da9e3', // Azul
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', 
                transition: 'background-color 0.3s'
              }}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Próximos Eventos en Cadereyta
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
