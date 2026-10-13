import '../css/animatedbackground.css';

export default function AnimatedBackground() {
  return (
    <div className='bg-canvas-container' aria-hidden='true'>
      <div className='bg-ring ring-1'></div>
      <div className='bg-ring ring-2'></div>
    </div>
  );
}
