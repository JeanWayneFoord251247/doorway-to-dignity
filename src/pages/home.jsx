import hero from '../assets/img/hero.png';
import logo from '../assets/img/Icon.png';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='home-page'>
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
}

export default Home;
