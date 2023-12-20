"use client";

import { createContext, useContext, useState } from "react";

type PaginationContextProps = {
    page: number;
    changePage: (page: number) => void;
}

export const PaginationContext = createContext<PaginationContextProps | null>(null);

export function PaginationProvider({ children }: { children: React.ReactNode }) {
    const [page, setPage] = useState(1);

    function changePage(pageNumber: number) {
        setPage(pageNumber);
    }

    return (
        <PaginationContext.Provider value={{
            page,
            changePage,
        }}>
            {children}
        </PaginationContext.Provider>
    );
}

export const usePagination = () => useContext(PaginationContext);
