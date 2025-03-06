export interface IEmployee{
    type:string,
    id:number,
    attributes:{
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        charge: string,
        salary: number,
        created_at: string,
        updated_at: string,
        },
    relationships:{
        workshifts:[],
        accesControls:[]
    }

}