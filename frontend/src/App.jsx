import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Volunteer from './pages/volunteer.jsx';
import Admin from './pages/admin.jsx';
import EventEditor from './pages/eventeditor.jsx';
import Account from './pages/account.jsx'
import { useAutoLogout } from './hooks/useautologout.jsx';

function App() {
  useAutoLogout(15);

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

        <Route path='/account' element={< Account />}/>
      </Routes>
    </div>
  );
}

export default App;
