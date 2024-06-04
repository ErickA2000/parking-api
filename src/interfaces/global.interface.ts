export interface PaginateResponse<T> {
  docs: T[];
  totalDocs: number;
  totalPages: number;
  limit: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
