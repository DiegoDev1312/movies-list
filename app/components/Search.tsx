import { usePagination } from '../contexts/PaginationContext';

export function Search() {
    const paginationUtils = usePagination();

    return (
        <input
            onChange={paginationUtils?.changeSearch}
            className="rounded-md h-10 text-white dark:text-white bg-zinc-600 outline-none pl-3 placeholder:text-white w-full mt-8"
            placeholder="Enter the movie name..."
            defaultValue={paginationUtils?.searchTxt}
        />
    );
}
