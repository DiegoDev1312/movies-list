"use client";

import { createContext, useContext, useState } from "react";
import { FilterType } from "../types/filterType";
import { debounce } from "lodash";

type PaginationContextProps = {
    page: number;
    changePage: (page: number) => void;
    searchLoading: boolean;
    changeSearchLoading: (isLoading: boolean) => void; 
    filterType: FilterType,
    changeFilterType: (filter: FilterType) => void; 
    searchTxt: string;
    changeSearch: (txt: React.ChangeEvent<HTMLInputElement>) => void;
    isLoading: boolean;
    changeLoading: (isLoading: boolean) => void;
}

export const PaginationContext = createContext<PaginationContextProps | null>(null);

export function PaginationProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(1);
    const [searchLoading, setSearchLoading] = useState(false);
    const [filterType, setFilterType] = useState<FilterType>('top_rated');
    const [searchTxt, setSearchTxt] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    function changePage(pageNumber: number) {
        setPage(pageNumber);
    }

    function changeFilterType(filterName: FilterType) {
        setFilterType(filterName);
    }

    function changeSearchLoading(isLoading: boolean) {
        setSearchLoading(isLoading);
    }

    function changeSearch(event: React.ChangeEvent<HTMLInputElement>) {
        changeSearchLoading(true);
        debounceChangeTxt(event.target.value);
    }

    function changeLoading(loadingCodition: boolean) {
        setIsLoading(loadingCodition);
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
            changeSearchLoading,
            filterType,
            changeFilterType,
            searchTxt,
            changeSearch,
            changeLoading,
            isLoading
        }}>
            {children}
        </PaginationContext.Provider>
    );
}

export const usePagination = () => useContext(PaginationContext);
