import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

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
          <h1>Dar de alta un nuevo lugar de barbacoa</h1>
          <form onSubmit={storeBarbacoa}>
            <div className='mb-3'>
              <label className='form-label'>Nombre</label>
              <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Ubicación</label>
              <input
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Horario</label>
              <input
                value={horario}
                onChange={(e) => setHorario(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Información</label>
              <input
                value={info}
                onChange={(e) => setInfo(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>URL de imagen</label>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                className='form-control'
              />
            </div>
            <button type='submit' className='btn btn-primary'>Guardar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBarbacoa;