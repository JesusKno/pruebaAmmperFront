import React, { useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';



export const ListaTransacciones = ({link, data , setVerTransacciones}) => {

    const [transacciones, setTransacciones] = useState([]);
    const [balance, setBalance] = useState([])
    const idAccount = data[0]['id']
    const handlerRegresar = () =>{
        setVerTransacciones(false)
    }

    const columns = [
        { field: 'category', headerName: 'Tipo de transaccion', width: 200 },
        {field: 'description', headerName: 'Descripcion', width: 200},
        {field: 'type', headerName: 'Entrada/Salida', width: 200},
        {field: 'amount', headerName: 'Monto de la transaccion', width: 200},
    ]
    useEffect(() =>{
        fetch(`https://pruebaammperback.onrender.com/transacciones/${link}/${idAccount}`)
          .then((response) => response.json())
          .then((json) =>{
                setBalance(json['balance'])
                setTransacciones(json['data']['results'])
          } )
      }, [])
  return (
        <>
            {
  

                    <div style={{ height: 500, width: '100%'}}>
                        <Button onClick={handlerRegresar}>Regresar a cuentas</Button>
                        <h1>Balance de la cuenta</h1>
                        <h2>${balance}</h2>
                        <DataGrid 
                        rows={transacciones} 
                        columns={columns} 
                        loading={!transacciones.length}
                        />
                    </div>

         
            }
        </>
        
  )
}