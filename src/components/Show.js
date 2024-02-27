import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Importamos el componente Link de react-router-dom
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';  // Importamos funciones de Firebase Firestore
import { db } from '../firebaseConfig/firebase';  // Importamos la instancia de Firebase Firestore
import Swal from 'sweetalert2';  // Importamos la librería SweetAlert2
import withReactContent from 'sweetalert2-react-content';  // Importamos la función withReactContent de SweetAlert2

const MySwal = withReactContent(Swal);  // Creamos una instancia de SweetAlert2

const ShowBarbacoas = () => {  // Definimos el componente funcional ShowBarbacoas
  // Configuramos los hooks para manejar el estado de las barbacoas
  const [barbacoas, setBarbacoas] = useState([]);

  // Referenciamos a la colección de Firestore "barbacoas"
  const barbacoasCollection = collection(db, "barbacoas");

  // Función para obtener todas las barbacoas
  const getBarbacoas = async () => {
    const data = await getDocs(barbacoasCollection);  // Obtenemos los documentos de la colección
    setBarbacoas(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));  // Actualizamos el estado con los datos de las barbacoas
  };

  // Función para eliminar una barbacoa
  const deleteBarbacoa = async (id) => {
    await deleteDoc(doc(db, "barbacoas", id));  // Eliminamos el documento de la base de datos
    getBarbacoas();  // Volvemos a obtener las barbacoas para actualizar la lista
  };

  // Función de confirmación para eliminar una barbacoa
  const confirmDelete = (id) => {
    MySwal.fire({  // Mostramos una alerta de SweetAlert2
      title: '¿Eliminar la barbacoa?',  // Título de la alerta
      text: "¡Esta acción no se puede revertir!",  // Texto de la alerta
      icon: 'warning',  // Ícono de advertencia
      showCancelButton: true,  // Mostramos el botón de cancelar
      confirmButtonColor: '#d33',  // Color del botón de confirmación
      cancelButtonColor: '#3085d6',  // Color del botón de cancelar
      confirmButtonText: 'Sí, eliminar'  // Texto del botón de confirmación
    }).then((result) => {  // Manejamos la respuesta del usuario
      if (result.isConfirmed) {  // Si el usuario confirma la acción
        deleteBarbacoa(id);  // Llamamos a la función para eliminar la barbacoa
        Swal.fire(  // Mostramos una alerta de SweetAlert2
          '¡Eliminado!',  // Título de la alerta
          'La barbacoa ha sido eliminada.',  // Texto de la alerta
          'success'  // Ícono de éxito
        );
      }
    });
  };

  // Usamos useEffect para obtener las barbacoas cuando se carga el componente
  useEffect(() => {
    getBarbacoas();  // Llamamos a la función para obtener las barbacoas
  }, []);

  // Devolvemos la vista de nuestro componente
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <div className="d-grid gap-2">
            <Link to="/create" className='btn btn-primary mt-2 mb-2'>Dar de alta un nuevo lugar de barbacoa</Link>
          </div>
          <table className='table table-striped table-bordered table-hover'>
            <thead className="thead-dark">
              <tr>
                <th className="text-center bg-dark text-light">Nombre</th>
                <th className="text-center bg-dark text-light">Ubicación</th>
                <th className="text-center bg-dark text-light">Horario</th>
                <th className="text-center bg-dark text-light">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {barbacoas.map((barbacoa, index) => (
                <tr key={barbacoa.id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                  <td>{barbacoa.nombre_barbacoa}</td>
                  <td>{barbacoa.ubicacion_barbacoa}</td>
                  <td>{barbacoa.horario_barbacoa}</td>
                  <td className="text-center">
                    <Link to={`/edit/${barbacoa.id}`} className="btn btn-info btn-sm"><i className="fa-solid fa-pencil"></i> Editar</Link>
                    <button onClick={() => { confirmDelete(barbacoa.id) }} className="btn btn-danger btn-sm ml-2"><i className="fa-solid fa-trash"></i> Eliminar</button>
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

export default ShowBarbacoas;
