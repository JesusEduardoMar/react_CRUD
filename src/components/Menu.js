import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faUsers, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; // Importamos los iconos de Font Awesome
import LogotipoBarbacoa from '../images/LogotipoBarbacoa.jpg'; // Importar la imagen
import './menu.css';

const Menu = () => {
  return (
    <div className='containermenu'>
      <div className='top-section'> {/* Esta es la parte superior con un color diferente */}
        <div className='colmenu'>
          <h1 className='tittletext'>Bienvenido</h1>
          <img className='logomenu'
            src={LogotipoBarbacoa}  // Se utiliza la imagen que importamos
            alt="Imagen de barbacoa" 
          />
        </div>
      </div>

      <div className='bottom-section'> {/* Esta es la parte inferior */}
        <div className="d-flex justify-content-center">
          {/* Enlaces */}
          <Link to="show" className="cssbuttons-io">
            <span>
              Lugares de Barbacoa en Cadereyta
            </span>
            <FontAwesomeIcon icon={faUtensils} className="me-2" />
          </Link>
          <Link to="showU" className="cssbuttons-io">
            <span>
              Usuarios registrados en la app
            </span>
            <FontAwesomeIcon icon={faUsers} className="me-2" />
          </Link>
          <Link to="show-events" className="cssbuttons-io">
            <span>
              Próximos Eventos en Cadereyta
            </span>
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;