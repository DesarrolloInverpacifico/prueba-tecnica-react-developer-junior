import { useEffect, useState } from "react"
import { IEmployee } from "../helpers/interfase";
import { getData } from "../helpers/data";
import Table from "./Table";
import { useSEO } from "../hooks/useSEO";
import { columnsEmployees } from "../helpers/colums";

function Employees() {

    const [data, setData] = useState<IEmployee[]>([])
    useSEO("lista de Empleados", "listado de registro de empleados")

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const Data = await getData();
                setData(Data.data);
            } catch (error) {
                console.error("Error obteniendo datos:", error);
            }
        };
        fetchData();
    },[])
      
  return (
    <div>
        <Table data={data} columns={columnsEmployees}/>
    </div>
  )
}

export default Employees
