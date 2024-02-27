import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const EditBarbacoa = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [horario, setHorario] = useState('');
  const [info, setInfo] = useState('');
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  const { id } = useParams();

  const updateBarbacoa = async (e) => {
    e.preventDefault();
    const barbacoa = doc(db, "barbacoas", id);
    const data = {
      nombre_barbacoa: nombre,
      ubicacion_barbacoa: ubicacion,
      horario_barbacoa: horario,
      info_barbacoa: info,
      url: url
    };
    await updateDoc(barbacoa, data);
    navigate('/');
  };

  const getBarbacoaById = async (id) => {
    const barbacoa = await getDoc(doc(db, "barbacoas", id));
    if (barbacoa.exists()) {
      setNombre(barbacoa.data().nombre_barbacoa);
      setUbicacion(barbacoa.data().ubicacion_barbacoa);
      setHorario(barbacoa.data().horario_barbacoa);
      setInfo(barbacoa.data().info_barbacoa);
      setUrl(barbacoa.data().url);
    } else {
      console.log('La barbacoa no existe');
    }
  };

  useEffect(() => {
    getBarbacoaById(id);
  }, [id]);

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <h1>Editar Barbacoa</h1>
          <form onSubmit={updateBarbacoa}>
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
            <button type='submit' className='btn btn-primary'>Actualizar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditBarbacoa;
