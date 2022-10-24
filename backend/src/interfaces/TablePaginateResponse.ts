export type TablePaginateResponse<T> = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    weigh_total: number;
    averageTicket: number;
    data: T[];
};