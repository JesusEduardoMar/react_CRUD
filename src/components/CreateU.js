import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';

const CreateUser = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const navigate = useNavigate();

  const usuariosCollection = collection(db, "usuarios");

  const storeUsuario = async (e) => {
    e.preventDefault();
    await addDoc(usuariosCollection, {
      nombre: nombre,
      correo: correo,
      telefono: telefono
    });
    navigate('/');
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <form onSubmit={storeUsuario}>
            <div className='card'>
              <div className="bg"></div>
              <div className="blob"></div>
              <div className='input-container' style={{ marginTop: '80px' }}>
                <div className="icon-container">
                  {/* Aquí va el ícono de Nombre*/}
                </div>
                <input
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  type="text"
                  className='form-control input-field'
                  placeholder="Ingresa el nombre"
                  name="nombre"
                  id="nombre"
                  autoComplete="name"
                />
                <label className='input-label' htmlFor="nombre">Nombre</label>
              </div>
              <div className='input-container'>
                <div className="icon-container">
                  {/* Aquí va el ícono de Correo */}
                </div>
                <input
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  type="email"
                  className='form-control input-field'
                  placeholder="Ingresa el correo"
                  name="correo"
                  id="correo"
                  autoComplete="email"
                />
                <label className='input-label' htmlFor="correo">Correo</label>
              </div>
              <div className='input-container'>
                <div className="icon-container">
                 {/* Aquí va el ícono de teléfono */}
                </div>
                <input
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  type="tel"
                  className='form-control input-field'
                  placeholder="Ingresa el teléfono"
                  name="telefono"
                  id="telefono"
                  autoComplete="tel"
                />
                <label className='input-label' htmlFor="telefono">Teléfono</label>
              </div>
              <button type='submit' className='btn btn-primary save-button'>Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
