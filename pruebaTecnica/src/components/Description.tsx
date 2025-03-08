import { useEffect, useState } from "react"
import { IAccessControls, IEmployee } from "../helpers/interfase"
import { getUserById } from "../helpers/data"
import { useNavigate, useParams } from "react-router-dom"
import Table from "./Table"
import { useSEO } from "../hooks/useSEO"
import { calculateWorkHours, ICalculo } from "../helpers/calculates"
import { columnsDescription } from "../helpers/colums"

function Description() {
    
    const navigate = useNavigate()
    const {id} = useParams()
    const idParam = Number(id)
    const [data, setData] = useState<IEmployee | undefined>(undefined)
    const [dataAccess, setDataAccess] = useState<IAccessControls[]>([])
    const [processedData, setProcessedData] = useState<IAccessControls[]>([]);
    const [calculo, setCalculo] = useState<ICalculo | null>(null)
    useSEO(`${data?.attributes.first_name} - detalles`, `Vista de detalles del usuario ${data?.attributes.first_name} ${data?.attributes.last_name}`)

    const volver = ()=>{
        navigate("/")
    }
    
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
        <h1 className="flex flex-col justify-center items-center font-bold text-4xl my-8 text-yellow-300"> 
            {data?.attributes.first_name.toLocaleUpperCase()} {data?.attributes.last_name.toLocaleUpperCase()} </h1>    
        {
            calculo && ( 
            <div className="flex justify-between mb-4 mx-16">
                <div className="flex flex-col justify-center items-center font-bold">
                    <h2>Horas trabajadas {Math.floor(calculo.totalWorkedHours)}</h2>
                    <h2>Hora ordinarias {Math.floor(calculo.totalOrdinaryHours)} </h2>
                    <h2>Horas extras {Math.floor(calculo.totalOvertimeHours)}</h2> 
                    <h2>Horas recargos {Math.floor(calculo.totalRecaudeHours)}</h2>
                </div>
                <div className="flex flex-col justify-center items-center">
                    {calculo.overtimeBreakdown.HED >= 0 && <p>Horas extras diurnas: {Math.floor(calculo.overtimeBreakdown.HED)}</p>}
                    {calculo.overtimeBreakdown.HEN >= 0 && <p>Horas extras nocturnas: {Math.floor(calculo.overtimeBreakdown.HEN)}</p>}
                    {calculo.overtimeBreakdown.HEDD >= 0 && <p>Hora extras diurna dominical o festiva: {Math.floor(calculo.overtimeBreakdown.HEDD)}</p>}
                    {calculo.overtimeBreakdown.HEDN >= 0 && <p>Hora extra dominical nocturna: {Math.floor(calculo.overtimeBreakdown.HEDN)}</p>}
                    {calculo.overtimeBreakdown.RC >= 0 && <p>Recargo nocturno: {Math.floor(calculo.overtimeBreakdown.RC)}</p>}
                    {calculo.overtimeBreakdown.RD >= 0 && <p>Recargo dominical: {Math.floor(calculo.overtimeBreakdown.RD)}</p>}
                    {calculo.overtimeBreakdown.RND >= 0 && <p>Recargo nocturno dominical: {Math.floor(calculo.overtimeBreakdown.RND)}</p>}
                    
                </div>
                <div className="flex  flex-col justify-center items-center">
                    <h2 className="font-bold">Salario Basico: ${Math.floor(calculo.basySalary).toLocaleString('es-CO')}</h2>
                    <h2 className="font-bold text-2xl">Salario Total: $<span className="text-yellow-300">{Math.floor(calculo.totalSalary).toLocaleString('es-CO')}</span></h2>
                    <button className="py-4 px-8 font-bold bg-yellow-300 mt-4 text-black rounded-2xl hover:bg-yellow-200 hover:cursor-pointer"
                    onClick={volver}
                    >Volver</button>
                </div>
                
            </div>
            )
        }                                  
                <Table data={processedData} columns={columnsDescription} />            
    </div>
  )
}

export default Description
