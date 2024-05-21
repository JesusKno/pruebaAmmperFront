import './App.css';
import { useState } from 'react';
import { Login } from './components/formLogin/login';
import { Home } from './components/formLogin/home';

function App() {
  const [usuario, setUsuario] = useState([])
  return (
    <div className="App">
      {
        !usuario.length > 0 
          ? <Login setUsuario = {setUsuario}/>
          : <Home usuario={usuario} setUsuario= {setUsuario}/>
      }
      
    </div>
  );
}

export default App;
