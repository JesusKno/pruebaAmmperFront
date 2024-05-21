import React, { useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { ListaCuentas } from './tablaListaCuentas';
import './styleListaBancos.css'



export const ListaBancos = () => {
    const [bancos, setBancos] = useState([]);
    const [cuentas, setCuentas] = useState([])
    const [verCuentas, setVerCuentas] = useState(false)

    const handleClickCuentas = (event, cellValues) =>{
        let data;
        if(cellValues !== null){
            data = cellValues.row
            setCuentas([data])
        }
        setVerCuentas(true)
    } 
    const columns = [
        { field: 'institution', headerName: 'Nombre de banco', width: 150 },
        {field: 'Revisar cuentas' , width: 150,
          renderCell: (cellValues) => {
            return(
              <Button
                variant='contained'
                color='primary'
               onClick={(event)=>{
                handleClickCuentas(event, cellValues)
                }}
              >
                ver cuentas
              </Button>
            )
          }
        }
    ]
    useEffect(() =>{
        fetch('http://127.0.0.1:8000/bancos')
          .then((response) => response.json())
          .then((json) => setBancos(json))
      }, [])
  return (
        <>
            {
                verCuentas === false
                ?
                    <div className='container'>
                       <div className='data-grid-container'>
                            <DataGrid 
                                rows={bancos} 
                                columns={columns} 
                                loading={!bancos.length}
                            />
                       </div>
                    </div>
                :
                <ListaCuentas data={cuentas} setVerCuentas={setVerCuentas}/>
            }
        </>
        
  )
}
