import { FaStar } from "react-icons/fa";

import { MovieListProps } from "../types/movieListType";

export function MovieList({ movieList }: { movieList: MovieListProps[] | undefined }) {
    function renderMovieList() {
        return movieList?.map((movie) => {
            const movieImage = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

            return (
                <button
                    key={movie.id}
                    className="p-3 border border-zinc-500 transition-all ease duration-200 rounded-md text-white flex flex-col gap-2 opacity-70 hover:opacity-100"
                >
                    <img className="h-96 w-full object-cover self-center" src={movieImage} />
                    <p>{movie.title}</p>
                    <p>{movie.release_date}</p>
                    <div className="flex items-center gap-2">
                        <FaStar color='#A57603' />
                        <p>{movie.vote_average.toFixed(2)}</p>
                    </div>
                </button>
            );
        });
    }

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 w-full">
            {renderMovieList()}
        </div>
    )
}