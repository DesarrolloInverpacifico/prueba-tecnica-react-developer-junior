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

export  async function getUserById(id: number){
    try{
        const data = await getData();                
        const user =  data.data.find((user: {id: number})=> user.id === id)        
        return user || null;
    }catch(error){
        console.error("Error al optener el empleado: ", error);
        return null
    }
}