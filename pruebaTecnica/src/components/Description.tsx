import { useEffect, useMemo, useState } from "react"
import { IAccessControls, IEmployee } from "../helpers/interfase"
import { getUserById } from "../helpers/data"
import { useParams } from "react-router-dom"
import { MRT_ColumnDef } from "material-react-table"
import Table from "./Table"
import { useSEO } from "../hooks/useSEO"
import { calculateWorkHours, ICalculo } from "../helpers/calculates"

function Description() {
    
    const {id} = useParams()
    const idParam = Number(id)
    const [data, setData] = useState<IEmployee | undefined>(undefined)
    const [dataAccess, setDataAccess] = useState<IAccessControls[]>([])
    const [processedData, setProcessedData] = useState<IAccessControls[]>([]);
    const [calculo, setCalculo] = useState<ICalculo | null>(null)
    useSEO(`${data?.attributes.first_name} - detalles`, `Vista de detalles del usuario ${data?.attributes.first_name} ${data?.attributes.last_name}`)
    
    
    
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
            const calcu = calculateWorkHours(data)
            setCalculo(calcu)
            
            
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
        {
            calculo && ( 
            <>
                <h2>Horas trabajadas {Math.floor(calculo.totalWorkedHours)} Hora ordinarias {Math.floor(calculo.totalOrdinaryHours)} horas extras {Math.floor(calculo.totalOvertimeHours)} horas recargos {Math.floor(calculo.totalRecaudeHours)}
                </h2>
                {calculo.overtimeBreakdown.HED > 0 && <p>Horas extras diurnas: {Math.floor(calculo.overtimeBreakdown.HED)}</p>}
                {calculo.overtimeBreakdown.HEN > 0 && <p>Horas extras nocturnas: {Math.floor(calculo.overtimeBreakdown.HEN)}</p>}
                {calculo.overtimeBreakdown.HEDD > 0 && <p>Hora extras diurna dominical o festiva: {Math.floor(calculo.overtimeBreakdown.HEDD)}</p>}
                {calculo.overtimeBreakdown.HEDN > 0 && <p>Hora extra dominical nocturna: {Math.floor(calculo.overtimeBreakdown.HEDN)}</p>}
                {calculo.overtimeBreakdown.RC > 0 && <p>Recargo nocturno: {Math.floor(calculo.overtimeBreakdown.RC)}</p>}
                {calculo.overtimeBreakdown.RD > 0 && <p>Recargo dominical: {Math.floor(calculo.overtimeBreakdown.RD)}</p>}
                {calculo.overtimeBreakdown.RND > 0 && <p>Recargo nocturno dominical: {Math.floor(calculo.overtimeBreakdown.RND)}</p>}
                <h2>Salario Basico: ${Math.floor(calculo.basySalary).toLocaleString('es-CO')} - Salario Total: ${Math.floor(calculo.totalSalary).toLocaleString('es-CO')}</h2>
            </>
            )
        }                                  
                <Table data={processedData} columns={columns} />            
    </div>
  )
}

export default Description
