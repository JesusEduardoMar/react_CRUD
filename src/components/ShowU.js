import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TableCRUD from "./TableCRUD";


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

  
  const labels=["Nombre", "Correo", "Teléfono", "", ""];
  const data = users.map(user=>{
    return {
      id: user.id,
      data_row: [user.nombre, user.correo, user.telefono],
    };
  });

  return (
    <div>
      <div className='container Show'>
      <div className='row'>
        <div className='col'>
          <div className="button-container" style={{ marginBottom: '20px', marginTop: '10px' }}> {/* Contenedor del botón Add Item */}
            <Link to="/createU" className="button link"> {/* Enlace al formulario de creación */}
              <span className="button__text">Dar de alta un nuevo usuario</span>
              <span className="button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </Link>
          </div>
          </div>
        </div>
        <TableCRUD labels={labels} bodyData={data} editRoute="/editu/" deleteFunction={confirmDelete} />
      </div>
    </div>

  );
}

export default ShowUsers;