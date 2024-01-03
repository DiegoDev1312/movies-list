"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { updateFavoriteList } from "../utils/functions";
import { MovieListProps } from "../types/movieListType";

type MovieContextProps = {
    favoriteList: Array<MovieListProps>;
    changeFavoriteList: (movie: MovieListProps) => void;
}

export const MovieContext = createContext<MovieContextProps | null>(null);

export function MovieProvider({ children }: { children: React.ReactNode }) {
    const [favoriteList, setFavoriteList] = useState<Array<MovieListProps>>([]);

    useEffect(() => {
        getFavoriteList();
    }, []);

    function getFavoriteList() {
        setFavoriteList(JSON.parse(localStorage.getItem('@favorite_list') || '[]'));
    }

    function changeFavoriteList(movie: MovieListProps) {
        const newFavoriteList = updateFavoriteList(movie);
        setFavoriteList(newFavoriteList);
    }

    return (
        <MovieContext.Provider value={{
            favoriteList,
            changeFavoriteList,
        }}>
            {children}
        </MovieContext.Provider>
    );
}

export const useMovie = () => useContext(MovieContext);
