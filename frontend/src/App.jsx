import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/signup.jsx';
import Home from './pages/home.jsx';
import Login from './pages/login.jsx';
import Volunteer from './pages/volunteer.jsx';
import Admin from './pages/admin.jsx';
import EventEditor from './pages/eventeditor.jsx';
import Account from './pages/account.jsx';
import Volunteers from './pages/volunteersearch.jsx';
import FAQ from './pages/faq.jsx';
import StudentDisclaimerModal from './components/studentdisclaimer.jsx';
import { useAutoLogout } from './hooks/useautologout.jsx';
import CookieBanner from './components/cookiebanner.jsx';
import ProtectedRoute from './components/protectedroute.jsx';

function App() {
  useAutoLogout(15);

  return (
    <div className='app-container'>
      <StudentDisclaimerModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/faq' element={<FAQ />} />

        <Route
          path='/volunteer'
          element={
            <ProtectedRoute>
              <Volunteer />
            </ProtectedRoute>
          }
        />
        <Route
          path='/volunteer-search'
          element={
            <ProtectedRoute>
              <Volunteers />
            </ProtectedRoute>
          }
        />
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute requiredRole='admin'>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route path='/admin/events/create' element={<EventEditor isEdit={false} />} />

        <Route path='/admin/events/edit/:id' element={<EventEditor isEdit={true} />} />

        <Route path='/admin/create-event' element={<EventEditor isEdit={false} />} />
      </Routes>

      <CookieBanner />
    </div>
  );
}

export default App;
