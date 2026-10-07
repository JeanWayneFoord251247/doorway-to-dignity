import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';

function App() {
  return (
    <div className='app-container'>

      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
