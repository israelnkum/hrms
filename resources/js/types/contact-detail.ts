import {PaginatedData} from "./common";

export type ContactDetail = {
    id: number,
    info_update?: any
}


export interface ContactDetailType extends PaginatedData {
    data: ContactDetail[];
}

export interface ContactDetailState {
    contactDetails: ContactDetailType,
    contactDetail: ContactDetail
}
