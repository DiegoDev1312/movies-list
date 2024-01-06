"use client";

import { MovieList } from "../components/MovieList";
import { useMovie } from "../contexts/MovieContext";
import { BackButton } from "../components/BackButton";

function FavoriteMovies() {
    const movieUtils = useMovie();

    function renderFavoritesMovies() {
        if (!movieUtils?.favoriteList.length) {
            return <h1 className="text-white text-2xl animate-bounce">Lista vázia!</h1>
        }

        return <MovieList movieList={movieUtils?.favoriteList} />
    }

    return (
        <main className="bg-zinc-900 flex items-center justify-center transition-all ease duration-150">
            <div className="flex min-h-screen flex-col items-center px-2 w-full sm:w-5/6">
                <BackButton />
                {renderFavoritesMovies()}
            </div>
        </main>
    );
}

export default FavoriteMovies;
