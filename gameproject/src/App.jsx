// src/App.jsx

import { Switch, Route } from 'wouter';
import Home from './pages/Home';
import Login from './pages/Login';
import Juego2 from './pages/Juego2.jsx';
import Juego3 from './pages/Juego3.jsx';
// Importa otras páginas según sea necesario

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/juego2" component={Juego2} />
      <Route path="/juego3" component={Juego3} />
      {/* Agrega rutas adicionales aquí */}
    </Switch>
  );
}

export default App;

