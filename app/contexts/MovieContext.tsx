"use client";

import { createContext, useContext, useState } from "react";
import { FilterType } from "../types/filterType";
import { updateFavoriteList } from "../utils/functions";
import { debounce } from "lodash";

type MovieContextProps = {
    page: number;
    changePage: (page: number) => void;
    searchLoading: boolean;
    changeSearchLoading: (isLoading: boolean) => void; 
    filterType: FilterType,
    changeFilterType: (filter: FilterType) => void; 
    favoriteList: Array<number>;
    changeFavoriteList: (movieId: number) => void;
    searchTxt: string;
    changeSearch: (txt: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MovieContext = createContext<MovieContextProps | null>(null);

export function MovieProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(1);
    const [searchLoading, setSearchLoading] = useState(false);
    const [filterType, setFilterType] = useState<FilterType>('top_rated');
    const [favoriteList, setFavoriteList] = useState<Array<number>>(JSON.parse(localStorage.getItem('@favorite_list') || '[]'));
    const [searchTxt, setSearchTxt] = useState('');

    function changePage(pageNumber: number) {
        setPage(pageNumber);
    }

    function changeFilterType(filterName: FilterType) {
        setFilterType(filterName);
    }

    function changeSearchLoading(isLoading: boolean) {
        setSearchLoading(isLoading);
    }

    function changeFavoriteList(movieId: number) {
        const newFavoriteList = updateFavoriteList(movieId);
        setFavoriteList(newFavoriteList);
    }

    function changeSearch(event: React.ChangeEvent<HTMLInputElement>) {
        changeSearchLoading(true);
        debounceChangeTxt(event.target.value);
    }

    const debounceChangeTxt =
        debounce((text: string) => {
            setSearchTxt(text);
            changePage(1);
        }, 1000);

    return (
        <MovieContext.Provider value={{
            page,
            changePage,
            searchLoading,
            changeSearchLoading,
            filterType,
            changeFilterType,
            favoriteList,
            changeFavoriteList,
            searchTxt,
            changeSearch
        }}>
            {children}
        </MovieContext.Provider>
    );
}

export const useMovie = () => useContext(MovieContext);
