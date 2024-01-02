"use client";

import { createContext, useContext, useState } from "react";
import { FilterType } from "../types/filterType";

type PaginationContextProps = {
    page: number;
    changePage: (page: number) => void;
    searchLoading: boolean;
    changeSearchLoading: (isLoading: boolean) => void; 
    filterType: FilterType,
    changeFilterType: (filter: FilterType) => void; 
}

export const PaginationContext = createContext<PaginationContextProps | null>(null);

export function PaginationProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(1);
    const [searchLoading, setSearchLoading] = useState(false);
    const [filterType, setFilterType] = useState<FilterType>('top_rated');

    function changePage(pageNumber: number) {
        setPage(pageNumber);
    }

    function changeFilterType(filterName: FilterType) {
        setFilterType(filterName);
    }

    function changeSearchLoading(isLoading: boolean) {
        setSearchLoading(isLoading);
    }

    return (
        <PaginationContext.Provider value={{
            page,
            changePage,
            searchLoading,
            changeSearchLoading,
            filterType,
            changeFilterType,
        }}>
            {children}
        </PaginationContext.Provider>
    );
}

export const usePagination = () => useContext(PaginationContext);
