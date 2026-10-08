import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx'
import Volunteer from './pages/volunteer.jsx'

function App() {
  return (
    <div className='app-container'>

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={<Signup />} />

        <Route path='/login' element={<Login />} />

        <Route path='/volunteer' element={<Volunteer />} />
      </Routes>
    </div>
  );
}

export default App;
