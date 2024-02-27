import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ShowUsers = () => {
  const [users, setUsers] = useState([]);

  const usersCollection = collection(db, "usuarios");

  const getUsers = async () => {
    const data = await getDocs(usersCollection);
    setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "usuarios", id));
    getUsers();
  };

  const confirmDelete = (id) => {
    MySwal.fire({
      title: '¿Eliminar al usuario?',
      text: "Esta acción no se puede revertir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(id);
        Swal.fire(
          '¡Eliminado!',
          'El usuario ha sido eliminado.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/createu" className='btn btn-primary mt-2 mb-2'>Crear nuevo usuario</Link>
          </div>
          <table className='table table-striped table-bordered table-hover'>
            <thead className="thead-dark">
              <tr>
                <th className="text-center bg-dark text-light">Nombre</th>
                <th className="text-center bg-dark text-light">Correo</th>
                <th className="text-center bg-dark text-light">Teléfono</th>
                <th className="text-center bg-dark text-light">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                  <td>{user.nombre}</td>
                  <td>{user.correo}</td>
                  <td>{user.telefono}</td>
                  <td className="text-center">
                    <Link to={`/editu/${user.id}`} className="btn btn-info btn-sm"><i className="fa-solid fa-pencil"></i> Editar</Link>
                    <button onClick={() => { confirmDelete(user.id) }} className="btn btn-danger btn-sm ml-2"><i className="fa-solid fa-trash"></i> Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ShowUsers;
