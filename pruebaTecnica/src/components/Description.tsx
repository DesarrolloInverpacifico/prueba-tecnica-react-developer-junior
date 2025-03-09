import { useEffect, useState } from "react"
import { IAccessControls, IEmployee } from "../helpers/interfase"
import { getUserById } from "../helpers/data"
import { useNavigate, useParams } from "react-router-dom"
import Table from "./Table"
import { useSEO } from "../hooks/useSEO"
import { calculateWorkHours, ICalculo } from "../helpers/calculates"
import { columnsDescription } from "../helpers/colums"
import Footer from "./Footer"
import NavBar from "./NavBar"

function Description() {
    
    const navigate = useNavigate()
    const {id} = useParams()
    const idParam = Number(id)
    const [data, setData] = useState<IEmployee | undefined>(undefined)
    const [dataAccess, setDataAccess] = useState<IAccessControls[]>([])
    const [processedData, setProcessedData] = useState<IAccessControls[]>([]);
    const [calculo, setCalculo] = useState<ICalculo | null>(null)
    const [show, setShow] = useState(false)
    useSEO(`${data?.attributes.first_name} - detalles`, `Vista de detalles del usuario ${data?.attributes.first_name} ${data?.attributes.last_name}`)

    const back = ()=>{
        navigate("/")
    }

    const showSesion = ()=>{
        setShow(!show)
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
        <NavBar/>
        {
            calculo && ( 

            <div>
                <header className="relactive">
                    <img src="/payFondo.png" alt="payFondo" className="w-full h-[80vh]" />
                    <h1 className="absolute left-40 top-30 text-4xl font-bold text-blue-700">{data?.attributes.first_name.toLocaleUpperCase()}</h1>
                    <h2 className="absolute left-50 top-40 text-3xl font-bold text-blue-700">{data?.attributes.last_name.toLocaleUpperCase()}</h2>
                    <h2 className="absolute left-44 top-54 text-2xl font-bold text-blue-700">{data?.attributes.charge.toLocaleUpperCase()}</h2>
                    <h2 className="absolute right-80 bottom-80 text-3xl font-bold text-blue-700">Salario Total</h2>
                    <h2 className="absolute right-80 bottom-70 text-3xl font-bold bg-blue-700 text-amber-300 px-8">${Math.floor(calculo.totalSalary).toLocaleString('es-CO')}</h2>
                    <button 
                        onClick={back}
                        className="absolute right-80 bottom-40 font-bold bg-blue-700 text-amber-300 px-8 py-2 rounded-full hover:scale-125 transition-all ease-in-out cursor-pointer"
                    >
                        Volver
                    </button>
                </header> 
                <section className="grid grid-cols-2 items-center justify-center mt-8 animate-show">
                    <div className="flex items-center justify-center">
                        <img src="/logo.png" alt="logo" className="w-[40%] h-40%"/>
                    </div>
                    <div>
                        <h2 className="text-2xl text-blue-700">Salario Basico: ${Math.floor(calculo.basySalary).toLocaleString('es-CO')}</h2>
                        <h2 className="font-bold text-3xl text-blue-700">Horas trabajadas {Math.floor(calculo.totalWorkedHours)}</h2>
                        <h2 className="text-3xl text-blue-700">Hora ordinarias {Math.floor(calculo.totalOrdinaryHours)} </h2>
                        <h2 className="text-3xl text-blue-700">Horas extras {Math.floor(calculo.totalOvertimeHours)}</h2> 
                        <h2 className="text-3xl text-red-500">Horas recargos {Math.floor(calculo.totalRecaudeHours)}</h2>
                        <h2 className="font-bold text-3xl text-blue-700 mt-8 ml-16">Salario Total: 
                            <span className="ml-2 text-3xl font-bold bg-blue-700 text-amber-300 px-8">${Math.floor(calculo.totalSalary).toLocaleString('es-CO')}</span> 
                        </h2>
                    </div>
                </section>  
                <section className="bg-blue-700 grid grid-cols-2 items-center justify-items-center justify-center mt-8 p-8">
                    <div className="text-amber-400 flex flex-col gap-2 font-bold text-2xl animate-show">
                        {calculo.overtimeBreakdown.HED >= 0 && <p>Horas extras diurnas: {Math.floor(calculo.overtimeBreakdown.HED)}</p>}
                        {calculo.overtimeBreakdown.HEN >= 0 && <p>Horas extras nocturnas: {Math.floor(calculo.overtimeBreakdown.HEN)}</p>}
                        {calculo.overtimeBreakdown.HEDD >= 0 && <p>Hora extras diurna dominical o festiva: {Math.floor(calculo.overtimeBreakdown.HEDD)}</p>}
                        {calculo.overtimeBreakdown.HEDN >= 0 && <p>Hora extra dominical nocturna: {Math.floor(calculo.overtimeBreakdown.HEDN)}</p>}
                        {calculo.overtimeBreakdown.RC >= 0 && <p>Recargo nocturno: {Math.floor(calculo.overtimeBreakdown.RC)}</p>}
                        {calculo.overtimeBreakdown.RD >= 0 && <p>Recargo dominical: {Math.floor(calculo.overtimeBreakdown.RD)}</p>}
                        {calculo.overtimeBreakdown.RND >= 0 && <p>Recargo nocturno dominical: {Math.floor(calculo.overtimeBreakdown.RND)}</p>}
                    </div>
                    <div className="animate-show">
                        <img src="/reloj.png" alt="iconoReloj" width={400}/>
                    </div>
                </section>
                <div className="flex flex-col justify-center items-center text-2xl text-blue-700 p-16 ">
                    <button onClick={showSesion} className="cursor-pointer hover:font-bold transition-all ease-in-out">{show ? "Ocultar Detalles": "Ver Detalles"}</button>
                </div>
                
                
            </div>
            )
        }                                  
                <section id="descriptionTable" className={show ? '':"hidden"}>
                    <Table data={processedData} columns={columnsDescription} />            
                </section>
                <Footer/>
    </div>
  )
}

export default Description
