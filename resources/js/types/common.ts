export type Role = "staff" | "admin" | "super-admin"

export interface Meta {
    pageCount: number;
    currentPage: number;
    total: number;
    from: number;
    links: {
        first: string;
        last: string;
        next: string | null;
        prev: string | null;
    };
}

export interface PaginatedData {
    data: any [];
    meta: Meta
}

export type CommonType = {
    id: number,
    name: string
}

export interface CommonState {
    commons: {
        ranks: CommonType[]
        departments: CommonType[],
        jobCategories: CommonType[],
        positions: CommonType[],
        educationalLevels: CommonType[],
        subUnits: CommonType[],
    },
    pendingActions: any,
    teamMembers: any,
    whoIsOut: any,
    userPermissions: any
}
