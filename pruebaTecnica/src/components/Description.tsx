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
                    <img src="/payFondo.png" alt="payFondo" className="w-full md:h-[80vh] opacity-20 md:opacity-100" />
                    <h1 className="absolute md:left-40 left-4 md:top-30 top-20 md:text-4xl font-bold text-blue-700">{data?.attributes.first_name.toLocaleUpperCase()}</h1>
                    <h2 className="absolute md:left-50 left-6 md:top-40 top-25 md:text-3xl font-bold text-blue-700">{data?.attributes.last_name.toLocaleUpperCase()}</h2>
                    <h2 className="absolute md:left-44 left-8 md:top-54 top-35 md:text-2xl font-bold text-blue-700">{data?.attributes.charge.toLocaleUpperCase()}</h2>
                    <h2 className="absolute md:right-80 right-8 md:top-150 top-42 md:text-3xl font-bold text-blue-700">Salario Total</h2>
                    <h2 className="absolute md:right-80 right-8 md:top-160 top-48 md:text-3xl font-bold bg-blue-700 text-amber-300 px-8">${Math.floor(calculo.totalSalary).toLocaleString('es-CO')}</h2>
                    <button 
                        onClick={back}
                        className="absolute md:right-80 right-8 md:top-180 top-58 font-bold bg-blue-700 text-amber-300 px-8 py-2 rounded-full hover:scale-125 transition-all ease-in-out cursor-pointer"
                    >
                        Volver
                    </button>
                </header> 
                <section className="grid md:grid-cols-2 items-center justify-center mt-8 animate-show">
                    <div className="flex items-center justify-center relative">
                        <img src="/logo.png" alt="logo" className="sm:w-[40%] sm:h-[40%] w-full opacity-20 md:opacity-100"/>
                    </div>
                    <div className="absolute md:relative">
                        <h2 className="sm:text-2xl text-blue-700 ml-5 sm:ml-0">Salario Basico: ${Math.floor(calculo.basySalary).toLocaleString('es-CO')}</h2>
                        <h2 className="font-bold sm:text-3xl text-blue-700 ml-5 sm:ml-0">Horas trabajadas {Math.floor(calculo.totalWorkedHours)}</h2>
                        <h2 className="sm:text-3xl text-blue-700 ml-5 sm:ml-0">Hora ordinarias {Math.floor(calculo.totalOrdinaryHours)} </h2>
                        <h2 className="sm:text-3xl text-blue-700 ml-5 sm:ml-0">Horas extras {Math.floor(calculo.totalOvertimeHours)}</h2> 
                        <h2 className="sm:text-3xl text-red-500 ml-5 sm:ml-0">Horas recargos {Math.floor(calculo.totalRecaudeHours)}</h2>
                        <h2 className="font-bold sm:text-3xl text-blue-700 mt-8 sm:ml-16 ml-5">Salario Total: 
                            <span className="ml-2 sm:text-3xl font-bold bg-blue-700 text-amber-300 px-8">${Math.floor(calculo.totalSalary).toLocaleString('es-CO')}</span> 
                        </h2>
                    </div>
                </section>  
                <section className="bg-blue-700 grid md:grid-cols-2 items-center justify-items-center justify-center mt-8 p-8">
                    <div className="text-amber-400 flex flex-col gap-2 font-bold md:text-2xl animate-show absolute md:relative z-10">
                        {calculo.overtimeBreakdown.HED >= 0 && <p>Horas extras diurnas: {Math.floor(calculo.overtimeBreakdown.HED)}</p>}
                        {calculo.overtimeBreakdown.HEN >= 0 && <p>Horas extras nocturnas: {Math.floor(calculo.overtimeBreakdown.HEN)}</p>}
                        {calculo.overtimeBreakdown.HEDD >= 0 && <p>Hora extras diurna dominical o festiva: {Math.floor(calculo.overtimeBreakdown.HEDD)}</p>}
                        {calculo.overtimeBreakdown.HEDN >= 0 && <p>Hora extra dominical nocturna: {Math.floor(calculo.overtimeBreakdown.HEDN)}</p>}
                        {calculo.overtimeBreakdown.RC >= 0 && <p>Recargo nocturno: {Math.floor(calculo.overtimeBreakdown.RC)}</p>}
                        {calculo.overtimeBreakdown.RD >= 0 && <p>Recargo dominical: {Math.floor(calculo.overtimeBreakdown.RD)}</p>}
                        {calculo.overtimeBreakdown.RND >= 0 && <p>Recargo nocturno dominical: {Math.floor(calculo.overtimeBreakdown.RND)}</p>}
                    </div>
                    <div className="animate-show relative z-1">
                        <img src="/reloj.png" alt="iconoReloj" className="opacity-20 md:opacity-100 sm:w-[40%] sm:h-[40%] w-full "/>
                    </div>
                </section>
                <div className="flex flex-col justify-center items-center sm:text-2xl text-blue-700 md:p-16 p-4">
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
