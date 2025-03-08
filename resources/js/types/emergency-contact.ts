import {PaginatedData} from "./common";

export type EmergencyContact = {
    id: number,
    name: string,
    info_update?: any
}


export interface EmergencyContactType extends PaginatedData {
    data: EmergencyContact[];
}

export interface EmergencyContactState {
    emergencyContacts: EmergencyContactType,
    emergencyContact: EmergencyContact,
    filter: any
}
