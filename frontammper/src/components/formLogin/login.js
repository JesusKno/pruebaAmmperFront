import React, {useState } from 'react'
import {useForm} from 'react-hook-form'
import { LoginRegister } from './loginRegister'
import md5 from 'md5'
import './stylesLogin.css'

export const Login = ({setUsuario}) => {

    const {register, handleSubmit} = useForm()
    const [registroUsuario, setRegistroUsuario] = useState(false)

   const onSubmit = (data, e) =>{
        try {
            const usuarioData = data.usuario
            const password = md5(data.password)      
            fetch(`http://127.0.0.1:8000/login/${usuarioData}/${password}`)
            .then(response => response.json())
            .then(result => setUsuario([result]))
            .catch(error => console.error('Error', error))
            
            
        } catch (error) {
            console.log('Error', error);
        }finally{
            e.target.reset()
        }
  }
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
                <input className='input' type='password' autoComplete='off'   placeholder='contraseña' {...register('password', {required: true})}/>
                <input className='button' type='submit' value='Iniciar'/>
                <input className='button colorButtonRegister' onClick={hanldeRegistro} type='submit' value='Registrase'/>
                </form>
            :
                <LoginRegister setUsuario={setUsuario}/>
       }

    </div>
  )
}
