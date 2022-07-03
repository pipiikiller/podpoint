export interface Pager {
    start?: number;
    count?: number;
    orderBy?: string;
    orderDirection?: OrderDirection;
}

export enum OrderDirection {
    ASCENDING = "ASC",
    DESCENDING = "DESC",
}

export enum SortBy {
    ID = "id",
    CREATED_AT = "created_at",
    DELETED_AT = "deleted_at",
    UPDATED_AT = "updated_at",
}
