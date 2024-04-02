import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './App';
import ImagesContext from './context/ImagesContext';
import image1 from './assets/images/juego1.jpeg';
import image2 from './assets/images/juego2.jpg';
import image3 from './assets/images/juego3.jpg';
import image4 from './assets/images/juego4.jpg';

const images = [
  // // Front
  // { position: [0, 0, 1.5], rotation: [0, 0, 0], url: image1 },
  // // Back
  // { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
  // { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
  // Left
  { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: image1, item: 'juego1' },
  { position: [-1.5, 0, 0.25], rotation: [0, Math.PI / 6, 0], url: image2, item: 'juego2' },
  // Right
  { position: [1.5, 0, 0.25], rotation: [0, -Math.PI / 6, 0], url: image3, item: 'juego3' },
  { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: image4, item: 'juego4' }
]

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <ImagesContext.Provider value={images}>
    <App />
  </ImagesContext.Provider>
);
