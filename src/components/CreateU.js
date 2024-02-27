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
          <h1>Dar de alta un nuevo usuario</h1>
          <form onSubmit={storeUsuario}>
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
              <label className='form-label'>Correo</label>
              <input
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                type="email"
                className='form-control'
              />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Teléfono</label>
              <input
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                type="tel"
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

export default CreateUser;
