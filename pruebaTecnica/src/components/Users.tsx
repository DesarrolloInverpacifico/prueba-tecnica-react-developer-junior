import React, { useState, useEffect } from 'react'
import {getData} from "../helpers/data.ts"
import { IEmployee } from '../helpers/interfase.js'


function Users() {
   
    const [data, setdata] = useState<IEmployee[]>([])

    useEffect(() =>{
        const fetchData = async ()=>{
            const Data = await  getData()
            console.log(Data);
            
            setdata(Data?.data || [])
        }
        fetchData()
    },[])
    
  return (
    <div>
      <h1>Lista de empleados</h1>
      <hr />
      <table>
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electronico</th>
                <th>Cargo</th>
                <th>Salario</th>
            </tr>
        </thead>
        <tbody>
            {
                data.length > 0 ? (
                    data.map((data)=>{
                        return(
                        <tr key={data.id}>
                            <td>{data.attributes.first_name}</td>
                            <td>{data.attributes.last_name}</td>
                            <td>{data.attributes.email}</td>
                            <td>{data.attributes.charge}</td>
                            <td>{data.attributes.salary}</td>
                        </tr>
                        )
                    })
                ):(
                    <tr>
                        <td>Cargando datos...</td>
                    </tr>
                )
            }
            
        </tbody>
      </table>
    </div>
  )
}

export default Users
