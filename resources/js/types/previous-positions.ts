import {PaginatedData} from "./common";

export type PreviousPosition = {
    id: number,
    info_update?: any
}


export interface PreviousPositionType extends PaginatedData {
    data: PreviousPosition[];
}

export interface PreviousPositionState {
    previousPositions: PreviousPositionType,
    previousPosition: PreviousPosition
}
