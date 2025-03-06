export  async function getData(){
    try {
        const res = await fetch("/employees.json")
        if(!res.ok) throw new Error("Error al optener los datos")
        const data = await res.json()    
       
        return data
    }catch(error){
        console.error("Error: ", error)
        return []
    }
}