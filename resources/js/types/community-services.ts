import {PaginatedData} from "./common";

export type CommunityService = {
    id: number,
    info_update?: any
}


export interface CommunityServiceType extends PaginatedData {
    data: CommunityService[];
}

export interface CommunityServiceState {
    communityServices: CommunityServiceType,
    communityService: CommunityService
}
