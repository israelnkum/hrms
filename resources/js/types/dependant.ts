import {PaginatedData} from "./common";

export type Dependant = {
    id: number,
    name: string,
}


export interface DependantType extends PaginatedData {
    data: Dependant[];
}

export interface DependantState {
    dependants: DependantType,
    dependant: Dependant
}
