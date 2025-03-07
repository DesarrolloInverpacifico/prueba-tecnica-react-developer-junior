import { useEffect, useMemo, useState } from "react"
import { IEmployee } from "../helpers/interfase";
import { getData } from "../helpers/data";
import { MRT_ColumnDef } from "material-react-table";
import Table from "./Table";
import { useSEO } from "../hooks/useSEO";

function Users() {

    const [data, setData] = useState<IEmployee[]>([])
    useSEO("lista de usuarios", "listado de usuarios con registros")
    
    const  columns = useMemo<MRT_ColumnDef<IEmployee>[]>(
        ()=>[
            {
                accessorKey: "attributes.first_name",
                header:"NOMBRE",
                enableHiding: false
            },
            {
                accessorKey: "attributes.last_name",
                header:"APELLIDO",
                enableHiding: false
            },            
            {
                accessorKey: "attributes.email",
                header:"CORREO ELECTRONICO",
                enableHiding: false
            },
            {
                accessorKey: "attributes.charge",
                header:"CARGO",
                enableHiding: false
            },
            {
                accessorKey: "attributes.salary",
                header:"SALARIO",
                enableHiding: false
            },

        ], []
    )

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
        <Table data={data} columns={columns}/>
    </div>
  )
}

export default Users
