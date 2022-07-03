import { SortBy } from "./Pager";

enum ChargeSortBy {
    FINISHED_AT = "finished_at",
    STARTED_AT = "started_at",
}

export type ChargeSort = SortBy | ChargeSortBy;
