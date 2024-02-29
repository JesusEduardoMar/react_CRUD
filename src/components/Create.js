import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMapMarkerAlt, faCalendarDays, faImage, faCircleInfo} from '@fortawesome/free-solid-svg-icons';


const CreateBarbacoa = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [horario, setHorario] = useState('');
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const barbacoasCollection = collection(db, "barbacoas");

  const storeBarbacoa = async (e) => {
    e.preventDefault();
    await addDoc(barbacoasCollection, {
      nombre_barbacoa: nombre,
      ubicacion_barbacoa: ubicacion,
      horario_barbacoa: horario,
      info_barbacoa: info,
      url: url
    });
    navigate('/');
  };

  return (
    <div className='container'>
  <div className='row'>
    <div className='col'>
      <form onSubmit={storeBarbacoa}>
      <div className='card'>
              <div className="bg"></div>
              <div className="blob"></div>
        <div className='input-container' style={{ marginTop: '80px' }}>
        <div className="icon-container">
        <FontAwesomeIcon icon={faHouse} className="me-2" style={{left: '20px', transform: 'translateY(-15%)', fontSize: '2em' }} />
        </div>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            className='form-control input-field'
            placeholder="Ingresa el nombre del lugar"
            name="nombre"
            id="nombre"
            autoComplete="name"
          />
          <label className='input-label' htmlFor="nombre">Nombre</label>
        </div>
        <div className='input-container'>
        <div className="icon-container">
        <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" style={{left: '10px', transform: 'translateY(-15%)', fontSize: '2em' }}/>
        </div>
          <input
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            type="text"
            className='form-control input-field'
            placeholder="Ingresa la ubicación del lugar"
            name="ubicacion"
            id="ubicacion"
            autoComplete="off"
          />
          <label className='input-label' htmlFor="ubicacion">Ubicación</label>
        </div>
        <div className='input-container'>
        <div className="icon-container">
        <FontAwesomeIcon icon={faCalendarDays} className="me-2" style={{left: '10px', transform: 'translateY(-15%)', fontSize: '2em' }}/>
        </div>
          <input
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            type="text"
            className='form-control input-field'
            placeholder="Ingresa el horario del lugar"
            name="horario"
            id="horario"
            autoComplete="off"
          />
          <label className='input-label' htmlFor="horario">Horario</label>
        </div>
        <div className='input-container'>
        <div className="icon-container">
        <FontAwesomeIcon icon={faCircleInfo} className="me-2" style={{left: '10px', transform: 'translateY(-15%)', fontSize: '2em' }}/>
        </div>
          <input
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            type="text"
            className='form-control input-field'
            placeholder="Ingresa una descrpción del lugar"
            name="info"
            id="info"
            autoComplete="off"
          />
          <label className='input-label' htmlFor="info">Información</label>
        </div>
        <div className='input-container'>
        <div className="icon-container">
        <FontAwesomeIcon icon={faImage} className="me-2" style={{left: '10px', transform: 'translateY(-15%)', fontSize: '2em' }}/>
        </div>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            type="text"
            className='form-control input-field'
            placeholder="Ingresa la URL de la imágen del lugar"
            name="url"
            id="url"
            autoComplete="off"
          />
          <label className='input-label' htmlFor="url">URL de imagen</label>
          </div>
          <button type='submit' className='btn btn-primary save-button'>Dar de Alta el Lugar</button>
        </div>
      </form>
      </div>
    </div>
  </div>
  );
}

export default CreateBarbacoa;