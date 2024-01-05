"use client";

import { createContext, useContext, useState } from "react";
import { FilterSort, FilterType } from "../types/filterType";
import { debounce } from "lodash";

type PaginationContextProps = {
    page: number;
    changePage: (page: number) => void;
    searchLoading: boolean;
    setSearchLoading: (isLoading: boolean) => void; 
    filterType: FilterType,
    setFilterType: (filter: FilterType) => void; 
    searchTxt: string;
    changeSearch: (txt: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    sortType: FilterSort;
    setSortType: (orderType: FilterSort) => void;
    genreType: number;
    setGenreType: (genreType: number) => void;
}

export const PaginationContext = createContext<PaginationContextProps | null>(null);

export function PaginationProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(1);
    const [searchLoading, setSearchLoading] = useState(false);
    const [filterType, setFilterType] = useState<FilterType>('vote_average');
    const [searchTxt, setSearchTxt] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [sortType, setSortType] = useState<FilterSort>('desc');
    const [genreType, setGenreType] = useState<number>(1);

    function changePage(pageNumber: number) {
        setPage(pageNumber);
    }

    function changeSearch(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchLoading(true);
        debounceChangeTxt(event.target.value);
    }

    const debounceChangeTxt =
        debounce((text: string) => {
            setSearchTxt(text);
            changePage(1);
        }, 1000);

    return (
        <PaginationContext.Provider value={{
            page,
            changePage,
            searchLoading,
            setSearchLoading,
            filterType,
            setFilterType,
            searchTxt,
            changeSearch,
            setIsLoading,
            isLoading,
            setSortType,
            sortType,
            setGenreType,
            genreType,
        }}>
            {children}
        </PaginationContext.Provider>
    );
}

export const usePagination = () => useContext(PaginationContext);
