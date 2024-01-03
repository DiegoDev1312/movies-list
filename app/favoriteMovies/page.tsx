"use client";

import { MovieList } from "../components/MovieList";
import { useMovie } from "../contexts/MovieContext";
import { BackButton } from "../components/BackButton";

function FavoriteMovies() {
    const movieUtils = useMovie();

    function renderFavoritesMovies() {
        if (!movieUtils?.favoriteList.length) {
            return <h1 className="text-white text-2xl animate-bounce">Empty list!</h1>
        }

        return <MovieList movieList={movieUtils?.favoriteList} />
    }

    return (
        <div className="bg-zinc-900 flex min-h-screen flex-col items-center px-2 transition-all ease duration-150 py-3 sm:px-8">
            <BackButton />
            {renderFavoritesMovies()}
        </div>
    );
}

export default FavoriteMovies;
