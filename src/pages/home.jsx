import hero from '../assets/img/hero.png';
import logo from '../assets/img/Icon.png';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar.jsx';
import VolunteerPage from './volunteer.jsx';
import AdminPage from './admin.jsx';
import PublicPage from './public.jsx';

function Home() {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    return <PublicLanding />;
  }

  if (userRole === 'admin') {
    return <AdminDashboard />;
  }

  return <VolunteerDashboard />;
}

return (
  <div className='home-page'>
    <Navbar />

    <main className='hero-section'>
      <img src={hero} alt='Background' className='hero-bg-image' />

      <div className='hero-overlay-content'>
        <img src={logo} alt='Doorway To Dignity Logo' className='hero-badge-logo' />

        <h1 className='hero-title'>
          Restoring Dignity, Renewing Hope,
          <span className='hero-title-sub'>One Step at a Time</span>
        </h1>

        <div className='hero-actions'>
          <Link to='/signup' className='btn-signup'>
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  </div>
);

export default Home;
