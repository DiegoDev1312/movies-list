import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import Link from 'next/link';

import { MovieListProps } from "../types/movieListType";
import { apiImage } from "../utils/functions";
import { useMovie } from "../contexts/MovieContext";

export function MovieList({ movieList }: { movieList: MovieListProps[] | undefined }) {
    const movieUtils = useMovie();
    function renderFavoriteHeart(movieId: number) {
        const coditionMarkedHeart = movieUtils?.favoriteList?.includes(movieId);

        const handleFavoritePress = (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            movieUtils?.changeFavoriteList(movieId);
        };

        return (
            <button title="Favorite" className="absolute right-2 bottom-3" onClick={handleFavoritePress}>
                <div className="drop-shadow-lg h-8 w-8 flex items-end justify-end">
                    {!coditionMarkedHeart ? <FaRegHeart size={22} color='#FFFFFF' /> : <FaHeart size={22} color='#DE281A' />}
                </div>
            </button>
        );
    }

    function renderMovieList() {
        return movieList?.map((movie) => {
            const movieImage = apiImage(movie.poster_path);

            return (
                <Link
                    href={`/movieDetails/${movie.id}`}
                    key={movie.id}
                    className="p-3 relative border border-zinc-500 transition-all ease duration-200 rounded-md text-white flex flex-col gap-2 opacity-70 hover:opacity-100 hover:scale-105"
                >
                    <img className="h-72 w-full object-contain self-center sm:h-96 sm:object-cover" src={movieImage} />
                    <p>{movie.title}</p>
                    <p>{movie.release_date}</p>
                    <div className="flex items-center gap-2">
                        <FaStar color='#A57603' />
                        <p>{movie.vote_average.toFixed(2)}</p>
                    </div>
                    {renderFavoriteHeart(movie.id)}
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