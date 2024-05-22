import React, {useState, useEffect} from 'react'
import Snackbar from '@mui/material/Snackbar';
import {useForm} from 'react-hook-form'
import md5 from 'md5'
import './stylesLogin.css'

export const LoginRegister = ({setUsuario, setRegistroUsuario}) => {

    const {register, handleSubmit, formState:{errors} } = useForm()
    const [error, setError] = useState(false) 
    const [mensaje, setMensaje] = useState()
    const [usuarioData, setUsuarioData] = useState([])
    const nombreUsuario = usuarioData.nombre
    const usuarioRegister = usuarioData.usuario
    const password = usuarioData.password
    // const [usuario, setUsuario] = useState([])

   const onSubmit = (data, e) =>{
        try {
            setUsuarioData(data)       
            console.log('correo', usuarioData, 'password', password)         
                     
        } catch (error) {
            console.log('Error', error);
        }finally{
            e.target.reset()
        }
  }

  useEffect(()=>{
    const validarLogin  = async () =>{
      try { 
        const options ={
            method: 'POST'
        }
        const res = await fetch(`https://pruebaammperback.onrender.com/loginRegister/${nombreUsuario}/${usuarioRegister}/${md5(password)}`, options )
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
    
  }, [nombreUsuario, password, setUsuario, usuarioRegister])

  const hanldeRegistro = ()=> {
    setRegistroUsuario(false)
  }

  return (
    <div className='container'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <label className='label'>Registro</label>
            <input className='input' type='text' autoFocus autoComplete='off'   placeholder='Nombre' {...register('nombre', {required: true})}/>
            {errors.nombre && <span>El campo de nombre es obligatorio</span>}
            <input className='input' type='text'  autoComplete='off'   placeholder='Usuario' {...register('usuario', {required: true})}/>
            {errors.usuario && <span>El campo de usuario es obligatorio</span>}
            <input className='input' type='password' autoComplete='off'   placeholder='Contraseña' {...register('password', {required: true})}/>
            {errors.password && <span>El campo de contraseña es obligatorio</span>}
            <input className='button' type='submit' value='Registrase'/>
            <input className='button colorButtonRegister' onClick={hanldeRegistro} type='submit' value='Regresar a LogIn'/>
            <Snackbar
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                  open={error}
                  autoHideDuration={1000}
                  message={mensaje}
            />
        </form>
    </div>
  )
}