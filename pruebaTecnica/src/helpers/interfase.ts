export interface IEmployee{
    type:"employee",
    id:number,
    attributes:{
        first_name: string,
        last_name: string,
        email: string,
        phone: string,
        charge: string,
        salary: number,
        created_at: Date,
        updated_at: Date,
        },
    relationships:{
        workshifts: IWorkshift[],
        accessControls:IAccessControls[]
    }
}

export interface IWorkshift {
    type: "workshift",
    id: number,
    attributes:{
        name: string,
        shedule_type: "fixed" | "fixed_halftime" | "flexible",
        maximun_weekly_hours: number,
        create_at: Date,
        updated_at: Date
    },
    relationships:{
        workshiftDays: IWorkshiftDays[]
    }
}

export interface IWorkshiftDays{
    type: "workshift_day",
    id: number,
    attributes:{
        day: string,
        start_at: string,
        finishied_at: string,
        break_time_start_at?: string | null,
        break_time_finishied_at?: string | null,
        create_at: Date,
        updated_at: Date
    }

}

export interface IAccessControls{
    type: "access_control",
    id: number,
    time: string | null,
    attributes:{
        check_in: string,
        check_out: string,
        created_at: string,
        updated_at: string,
    }
}
