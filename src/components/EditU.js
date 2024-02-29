import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const EditUser = () => {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const updateUser = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "usuarios", id);
    const data = {
      nombre: nombre,
      correo: correo,
      telefono: telefono
    };
    await updateDoc(userDoc, data);
    navigate('/');
  };

  const getUserById = async (id) => {
    const userDoc = await getDoc(doc(db, "usuarios", id));
    if (userDoc.exists()) {
      setNombre(userDoc.data().nombre);
      setCorreo(userDoc.data().correo);
      setTelefono(userDoc.data().telefono);
    } else {
      console.log('El usuario no existe');
    }
  };

  useEffect(() => {
    getUserById(id);
  }, [id]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Editar Usuario</h1>
          <form onSubmit={updateUser}>
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
            <button type='submit' className='btn btn-primary'>Actualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditUser;

