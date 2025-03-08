import {PaginatedData} from "./common";

export type Qualification = {
    id: number,
    info_update?: any
}


export interface QualificationType extends PaginatedData {
    data: Qualification[];
}

export interface QualificationState {
    qualifications: QualificationType,
    qualification: Qualification,
}
