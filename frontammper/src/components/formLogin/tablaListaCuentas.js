import React, { useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { ListaTransacciones } from './tablaListaTransacciones';



export const ListaCuentas = ({data , setVerCuentas}) => {

    const [cuentas, setCuentas] = useState([]);
    const [verTransacciones, setVerTransacciones] = useState(false)
    const [dataCuentas, setDataCuentas] = useState([])

    const link = data[0]['id']

    const handlerRegresar = () =>{
        setVerCuentas(false)
    }


    const handleClickCuentas = (event, cellValues) =>{
        let data;
        if(cellValues !== null){
            data = cellValues.row
        }
        setDataCuentas([data])
        setVerTransacciones(true)
        
    } 
    const columns = [
        { field: 'name', headerName: 'Nombre de Cuenta', width: 200 },
        {field: 'number', headerName: 'Numero de cuenta', width: 200},
        {field: 'category', headerName: 'Tipo de cuenta', width: 200},
        {field: 'Revisar cuentas' , width: 250,
          renderCell: (cellValues) => {
            return(
              <Button
                variant='contained'
                color='primary'
               onClick={(event)=>{
                handleClickCuentas(event, cellValues)
                }}
              >
                Ver transacciones
              </Button>
            )
          }
        }
    ]
    useEffect(() =>{
        fetch(`https://pruebaammperback.onrender.com/cuentas/${link}`)
          .then((response) => response.json())
          .then((json) => setCuentas(json['results']))
      }, [])
  return (
        <>
            {
  
                verTransacciones === false
                ?
                    <div style={{ height: 500, width: '100%'}}>
                        <Button onClick={handlerRegresar}>Regresar a bancos</Button>
                        <DataGrid 
                        rows={cuentas} 
                        columns={columns} 
                        loading={!cuentas.length}
                        />
                    </div>
                :
                   <ListaTransacciones link={link} data={dataCuentas} setVerTransacciones={setVerTransacciones}/>
         
            }
        </>
        
  )
}