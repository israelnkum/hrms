import {PaginatedData} from "./common";

export type People = {
    id: number,
    title: string,
    rank: string,
    work_email: string,
    work_telephone: string,
    name: string,
}


export interface PeopleType extends PaginatedData {
    data: People[];
}

export interface PeopleState {
    people: PeopleType,
    person: People,
    filter: any
}
