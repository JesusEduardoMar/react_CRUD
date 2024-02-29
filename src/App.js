import './App.css';
import './Login.css';
import './Create.css';
import './Show.css'; 
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Show from './components/Show';
import ShowU from './components/ShowU';
import CreateU from './components/CreateU'; 
import EditU from './components/EditU'; 
import Create from './components/Create';
import Edit from './components/Edit';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/show' element={<Show />} />
          <Route path='/showu' element={<ShowU />} />
          <Route path='/createu' element={<CreateU />} /> {/* Ruta para crear usuario */}
          <Route path='/editu/:id' element={<EditU />} /> {/* Ruta para editar usuario */}
          <Route path='/create' element={<Create />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

