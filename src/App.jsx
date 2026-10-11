import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Volunteer from './pages/volunteer.jsx';
import Admin from './pages/admin.jsx';
import EventEditor from './pages/eventeditor.jsx';

function App() {
  return (
    <div className='app-container'>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path='/volunteer' element={<Volunteer />} />

        <Route path='/admin' element={<Admin />} />

        <Route path='/admin/create-event' element={<EventEditor isEdit={false} />} />

        <Route path='/admin/edit-event' element={<EventEditor isEdit={true} />} />
      </Routes>
    </div>
  );
}

export default App;
