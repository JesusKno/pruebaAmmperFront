import React from 'react'
import {useForm} from 'react-hook-form'
import md5 from 'md5'
import './stylesLogin.css'

export const LoginRegister = ({setUsuario}) => {

    const {register, handleSubmit} = useForm()
    // const [usuario, setUsuario] = useState([])

   const onSubmit = (data, e) =>{
        try {
            const nombreUsuario = data.nombre
            const usuarioData = data.usuario
            const password = md5(data.password)
            console.log('correo', usuarioData, 'password', password)         
            fetch(`http://127.0.0.1:8000/loginRegister/${nombreUsuario}/${usuarioData}/${password}`)
            .then(response => response.json())
            .then(result => setUsuario([result]))
            .catch(error => console.error('Error', error))
            
            
        } catch (error) {
            console.log('Error', error);
        }finally{
            e.target.reset()
        }
  }
  return (
    <div className='container'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
            <label className='label'>Registro</label>
            <input className='input' type='text' autoFocus autoComplete='off'   placeholder='usuario' {...register('nombre', {required: true})}/>
            <input className='input' type='text' autoFocus autoComplete='off'   placeholder='usuario' {...register('usuario', {required: true})}/>
            <input className='input' type='password' autoComplete='off'   placeholder='contraseña' {...register('password', {required: true})}/>
            <input className='button' type='submit' value='Registrase'/>
        </form>
    </div>
  )
}