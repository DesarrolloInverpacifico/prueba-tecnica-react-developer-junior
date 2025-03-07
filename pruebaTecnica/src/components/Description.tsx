import { useEffect, useMemo, useState } from "react"
import { IAccessControls, IEmployee } from "../helpers/interfase"
import { getUserById } from "../helpers/data"
import { useParams } from "react-router-dom"
import { MRT_ColumnDef } from "material-react-table"
import Table from "./Table"

function Description() {
    const {id} = useParams()
    const idParam = Number(id)
    const [data, setData] = useState<IEmployee | undefined>(undefined)
    const [dataAccess, setDataAccess] = useState<IAccessControls[]>([])
    const [processedData, setProcessedData] = useState<IAccessControls[]>([]);
    
    const  columns = useMemo<MRT_ColumnDef<IAccessControls>[]>(
        ()=>[
            {
                accessorKey: "attributes.check_in",
                header:"INGRESO",
                enableHiding: false
            },
            {
                accessorKey: "attributes.check_out",
                header:"SALIDA",
                enableHiding: false
            },
            {
                accessorKey: "attributes.created_at",
                header:"DIA",
                enableHiding: false
            },
            {
                accessorKey: "time",
                header:"TIEMPO",
                enableHiding: false
            },
        ], []
    )
      useEffect(()=>{
        const fetchUser = async()=>{
            try{
                const userData = await getUserById(idParam);            
                setData(userData);                                  
            }  catch(error){
                console.error("Error al optener datos del usuario", error)
            }              
        }
        fetchUser()        
    },[])

    useEffect(()=>{
        if(data){            
            setDataAccess(data.relationships.accessControls)
        }
        
    },[data])   

    useEffect(()=>{
        if(dataAccess){            
            const newData = dataAccess?.map(items=> {
                const check_in = items.attributes.check_in
                const check_out = items.attributes.check_out

                if(!check_in || !check_out){
                    return{ ...items, time: null}
                }

                const data1: Date = new Date(items.attributes.check_in);                
                const data2: Date = new Date(items.attributes.check_out);
                const diffMs: number = data2.getTime() - data1.getTime(); // Diferencia en milisegundos
                const diffHours: number = Math.floor(diffMs / (1000 * 60 * 60));
                const diffMinutes: number = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                const time:string =  `${diffHours}h ${diffMinutes}m`;
                return {
                    ...items,
                    time
                }
            });          
            setProcessedData(newData)                 
        }
    },[dataAccess]) 
   
  return (
    <div>
        <h1> {data?.attributes.first_name.toLocaleUpperCase()} {data?.attributes.last_name.toLocaleUpperCase()} </h1>                                
                <Table data={processedData} columns={columns} />            
    </div>
  )
}

export default Description