"use client";

import { createContext, useContext, useState } from "react";

type PaginationContextProps = {
    page: number;
    changePage: (page: number) => void;
    searchLoading: boolean;
    changeSearchLoading: (isLoading: boolean) => void; 
}

export const PaginationContext = createContext<PaginationContextProps | null>(null);

export function PaginationProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(1);
    const [searchLoading, setSearchLoading] = useState(false);

    function changePage(pageNumber: number) {
        setPage(pageNumber);
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
        }}>
            {children}
        </PaginationContext.Provider>
    );
}

export const usePagination = () => useContext(PaginationContext);
