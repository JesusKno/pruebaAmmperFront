import React, {useState, useEffect } from 'react'
import {useForm} from 'react-hook-form'
import { LoginRegister } from './loginRegister'
import Snackbar from '@mui/material/Snackbar';
import md5 from 'md5'
import './stylesLogin.css'

export const Login = ({setUsuario}) => {

    const {register, handleSubmit, formState:{errors}, } = useForm()
    const [registroUsuario, setRegistroUsuario] = useState(false)
    const [error, setError] = useState(false) 
    const [mensaje, setMensaje] = useState()
    const [usuarioData, setUsuarioData] = useState([])
    const usuarioRegister = usuarioData.usuario
    const password = usuarioData.password

   const onSubmit = (data, e) =>{
        try {   
     
            setUsuarioData(data)  
            console.log(error);
            
        } catch (error) {
            console.log('Error', error);
        }finally{
            e.target.reset()
           
        }
  }

  useEffect(()=>{
    const validarLogin  = async () =>{
      try { 

        const res = await fetch(`http://127.0.0.1:8000/login/${usuarioRegister}/${md5(password)}`)
        const data = await res.json()
        console.log('revisa la data', data);
        if(data.Error){
          const error = data.Error
          console.log(error);
          setError(true)
          setMensaje(error)
          
        }else{
          const usuario = data.usuario
          console.log(usuario)
          setUsuario(usuario)
        }
        
      } catch (error) {
        
      }finally{
        setTimeout(()=>{
          setError(false)
        }, 3000)
      }
    }

    validarLogin()
    
  }, [password, setUsuario, usuarioRegister])

  

  const hanldeRegistro = ()=> {
    setRegistroUsuario(true)
  }

  return (
    <div className='container'>
       {
            registroUsuario === false 
            ?  <form className='form' onSubmit={handleSubmit(onSubmit)}>
                <label className='label'>Login</label>
                <input className='input' type='text' autoFocus autoComplete='off'   placeholder='usuario' {...register('usuario', {required: true})}/>
                {errors.usuario && <span>El campo de usuario es obligatorio</span>}
                <input className='input' type='password' autoComplete='off'   placeholder='contraseña' {...register('password', {required: true})}/>
                {errors.password && <span>El campo de contraseña es obligatorio</span>}
                <input className='button' type='submit' value='Iniciar'/>
                <input className='button colorButtonRegister' onClick={hanldeRegistro} type='submit' value='Registrase'/>
                <Snackbar
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                  open={error}
                  autoHideDuration={1000}
                  message={mensaje}
                />
                </form>
            :
                <LoginRegister setUsuario={setUsuario} setRegistroUsuario={setRegistroUsuario}/>
       }

    </div>
  )
}
