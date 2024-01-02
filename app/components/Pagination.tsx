import ReactPaginate from 'react-paginate';

import { useMovie } from "../contexts/MovieContext";
import { MovieResponseProps } from '../types/movieResponseType';

type PaginationProps = {
    movie: MovieResponseProps;
}

export function Pagination({ movie }: PaginationProps) {
    const movieUtils = useMovie();
    const initialPage = movie?.page ? movie?.page - 1 : 1;

    const changePagination = (e: { selected: number }) => {
        movieUtils?.changePage(e.selected + 1);
    };

    return (
        <div className="flex gap-2 mt-6">
            <ReactPaginate
                breakLabel="..."
                initialPage={initialPage}
                nextLabel="Próxima"
                onPageChange={changePagination}
                pageRangeDisplayed={1}
                pageCount={movie.total_pages > 500 ? 500 : movie.total_pages}
                previousLabel="Anterior"
                className="flex text-white gap-2 flex-wrap items-center"
                pageClassName='flex items-center justify-center hover:scale-110 transition-all ease duration-100 p-3 border border-zinc-500 rounded-md'
                renderOnZeroPageCount={null}
                activeClassName='flex items-center justify-center scale-110 border border-zinc-500 rounded-md'
            />
        </div>
    );
}