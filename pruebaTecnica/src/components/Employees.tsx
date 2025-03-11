import { useEffect, useState } from "react"
import { IEmployee } from "../helpers/interfase";
import { getData } from "../helpers/data";
import Table from "./Table";
import { useSEO } from "../hooks/useSEO";
import { columnsEmployees } from "../helpers/colums";
import NavBar from "./NavBar";
import Footer from "./Footer";

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
    <div className="">
        <NavBar/>
        <section className="relative">
            <img src="/empleadosTrabajando.png" alt="fondoEmpleados" className="w-full md:h-[80vh]" />
            <a 
                 onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("lista")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-700 text-amber-300 md:py-4 py-1 md:px-8 px-3 font-bold rounded-full transition-all ease-in-out hover:scale-105 hover:cursor-pointer 
                absolute md:right-16 right-4 md:bottom-16 bottom-4">
                Ver Empleados
            </a>
        </section>
        <div className="flex flex-col items-center justify-center md:my-8 my-4 animate-show">
            <h1 className="font-bold md:text-4xl text-blue-700 text-center">Listado De Empleados</h1>
        </div>
        <section id="lista" className="animate-show">
            <Table data={data} columns={columnsEmployees}/>
        </section>
        <Footer/>
    </div>
  )
}

export default Employees
