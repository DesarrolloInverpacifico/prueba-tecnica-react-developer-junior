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
            <img src="/empleadosTrabajando.png" alt="fondoEmpleados" className="w-full h-[80vh]" />
            <a 
                 onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("lista")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-blue-700 text-amber-300 py-4 px-8 font-bold rounded-full transition-all ease-in-out hover:scale-105 hover:cursor-pointer absolute right-16 bottom-16">
                Ver Empleados
            </a>
        </section>
        <div className="flex flex-col items-center justify-center my-8">
            <h1 className="font-bold text-4xl text-blue-700">Listado De Empleados</h1>
        </div>
        <section id="lista">
            <Table data={data} columns={columnsEmployees}/>
        </section>
        <Footer/>
    </div>
  )
}

export default Employees
