import React from 'react';
import './style.css'; 
import perrito from '../assets/images/perrito.png';
import vikingo from '../assets/images/vikingo.png';

const App = () => {
  return (
    <div className="container">
      <h1>Experiencia AR</h1>
      <div className="images-container">
        <div className="ar-item">
          <a href="https://ar-model-viewer-two.vercel.app/" className="ar-link">
            <img src={perrito} alt="Imagen AR 1" />
          </a>
          <p className="ar-url">https://ar-model-viewer-two.vercel.app/</p>
        </div>
        <div className="ar-item">
          <a href="https://ar-character-ochre.vercel.app/" className="ar-link">
            <img src={vikingo} alt="Imagen AR 2" />
          </a>
          <p className="ar-url">https://ar-character-ochre.vercel.app/</p>
        </div>

      </div>
      <button onClick={() => window.location.href = '/'}>Volver a Home</button>
    </div>
  );
};

export default App;

