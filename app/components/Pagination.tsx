import ReactPaginate from 'react-paginate';

import { usePagination } from "../contexts/PaginationContext";
import { MovieResponseProps } from '../types/movieResponseType';

type PaginationProps = {
    movieInfo: MovieResponseProps;
}

export function Pagination({ movieInfo }: PaginationProps) {
    const pageInfo = usePagination();

    return (
        <div className="flex gap-2 mt-6">
            <ReactPaginate
                breakLabel="..."
                nextLabel="Próxima"
                onPageChange={(e) => pageInfo?.changePage(e.selected + 1)}
                pageRangeDisplayed={2}
                pageCount={movieInfo.total_pages}
                previousLabel="Anterior"
                className="flex gap-2 flex-wrap items-center"
                pageClassName='flex items-center justify-center p-3 border border-zinc-500 rounded-md'
                renderOnZeroPageCount={null}
                activeClassName='flex items-center justify-center p-4 border border-zinc-500 rounded-md'
            />
        </div>
    );
}