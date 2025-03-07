import {PaginatedData} from "./common";

export type Employee = {
    id: number
}


export interface EmployeeType extends PaginatedData {
    data: Employee[];
}

export interface EmployeeState {
    employees: EmployeeType,
    people: EmployeeType,
    employee: Employee,
    filter: any
}
