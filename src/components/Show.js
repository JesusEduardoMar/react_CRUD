import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  // Importamos el componente Link de react-router-dom
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';  // Importamos funciones de Firebase Firestore
import { db } from '../firebaseConfig/firebase';  // Importamos la instancia de Firebase Firestore
import Swal from 'sweetalert2';  // Importamos la librería SweetAlert2
import withReactContent from 'sweetalert2-react-content';  // Importamos la función withReactContent de SweetAlert2
import TableCRUD from "./TableCRUD";

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

  const labels=["Nombre", "Ubicación", "Horario", "", ""];
  const data = barbacoas.map(barbacoa=>{
    return {
      id: barbacoa.id,
      data_row: [barbacoa.nombre_barbacoa, barbacoa.ubicacion_barbacoa, barbacoa.horario_barbacoa],
    };
  });

  // Devolvemos la vista de nuestro componente
  return (
    <div className='container Show'>
      <div className='row'>
        <div className='col'>
          <div className="button-container" style={{ marginBottom: '20px', marginTop: '10px' }}> {/* Contenedor del botón Add Item */}
            <Link to="/create" className="button link"> {/* Enlace al formulario de creación */}
              <span className="button__text">Dar de alta un nuevo lugar de barbacoa</span>
              <span className="button__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor" height="24" fill="none" className="svg">
                  <line y2="19" y1="5" x2="12" x1="12"></line>
                  <line y2="12" y1="12" x2="19" x1="5"></line>
                </svg>
              </span>
            </Link>
          </div>
          
          <TableCRUD labels={labels} bodyData={data} editRoute="/edit/" deleteFunction={confirmDelete} />
        </div>
      </div>
    </div>
  );
}

export default ShowBarbacoas;
