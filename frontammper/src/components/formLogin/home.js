import React from 'react'
import { ListaBancos } from './tablaListaBancos'
import './styleHome.css'

export const Home = ({usuario, setUsuario}) => {
    const handleCerrarSesion = () =>{

        setUsuario([])

    }
  return (
    <>
        <div className='container'>
            <div className='greeting-section'>
                <h1>Bienvenido {usuario[0]['usuario']}</h1>
                <button onClick={handleCerrarSesion}>Cerrar sesion</button>
            </div>

            <ListaBancos/>
            
        </div>

           
        
    </>
    
  )
}
