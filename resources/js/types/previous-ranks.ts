import {PaginatedData} from "./common";

export type PreviousRank = {
    id: number,
    info_update?: any
}


export interface PreviousRankType extends PaginatedData {
    data: PreviousRank[];
}

export interface PreviousRankState {
    previousRanks: PreviousRankType,
    previousRank: PreviousRank
}
