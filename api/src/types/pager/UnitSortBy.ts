import { SortBy } from "./Pager";

enum UnitSortBy {
    POSTCODE = "postcode",
    STATUS = "status",
}

export type UnitSort = SortBy | UnitSortBy;
