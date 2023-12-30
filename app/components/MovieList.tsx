import { FaStar } from "react-icons/fa";
import Link from 'next/link';

import { MovieListProps } from "../types/movieListType";
import { apiImage } from "../utils/functions";

export function MovieList({ movieList }: { movieList: MovieListProps[] | undefined }) {
    function renderMovieList() {
        return movieList?.map((movie) => {
            const movieImage = apiImage(movie.poster_path);

            return (
                <Link
                    href={`/movieDetails/${movie.id}`}
                    key={movie.id}
                    className="p-3 border border-zinc-500 transition-all ease duration-200 rounded-md text-white flex flex-col gap-2 opacity-70 hover:opacity-100 hover:scale-105"
                >
                    <img className="h-72 w-full object-contain self-center sm:h-96 sm:object-cover" src={movieImage} />
                    <p>{movie.title}</p>
                    <p>{movie.release_date}</p>
                    <div className="flex items-center gap-2">
                        <FaStar color='#A57603' />
                        <p>{movie.vote_average.toFixed(2)}</p>
                    </div>
                </Link>
            );
        });
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 w-full">
            {renderMovieList()}
        </div>
    );
}