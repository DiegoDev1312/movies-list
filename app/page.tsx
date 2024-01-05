"use client";

import { useEffect, useState } from "react";

import { movies, searchMovie } from "./services/movieList";
import { MovieList } from "./components/MovieList";
import { MovieResponseProps } from "./types/movieResponseType";
import { Pagination } from "./components/Pagination";
import { Loading } from "./components/Loading";
import { Search } from "./components/Search";
import { SearchLoading } from "./components/SearchLoading";
import { Filter } from "./components/Filter";
import { Hearder } from "./components/Header";
import { usePagination } from "./contexts/PaginationContext";
import { filterOptions, sortBy, genreOptions } from "./utils/constants";
import { FilterSort, FilterType } from "./types/filterType";

export default function Home() {
  const initialMovieInfo = {
    results: [],
    page: 0,
    total_pages: 0,
  };
  const paginationUtils = usePagination();
  
  const [movieInfo, setMovieInfo] = useState<MovieResponseProps>(initialMovieInfo);

  useEffect(() => {
    paginationUtils?.searchTxt ? getSearchMovies() : getMovies();
    goPageToTop();
  }, [paginationUtils?.page, paginationUtils?.searchTxt, paginationUtils?.filterType, paginationUtils?.sortType, paginationUtils?.genreType]);

  async function getMovies() {
    const allMovies: MovieResponseProps = await movies(
      paginationUtils?.page,
      paginationUtils?.filterType,
      paginationUtils?.sortType,
      paginationUtils?.genreType,
    );
  
    setMovieInfo(allMovies);
    paginationUtils?.setIsLoading(false);
    paginationUtils?.setSearchLoading(false);
  }
  
  async function getSearchMovies() {
    const allSearchMovies: MovieResponseProps = await searchMovie(paginationUtils?.page, paginationUtils?.searchTxt);
    setMovieInfo(allSearchMovies);
    paginationUtils?.setSearchLoading(false);
  }

  function goPageToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMovieArea() {
    if (paginationUtils?.isLoading && !paginationUtils?.searchTxt) {
      return <Loading />
    }

    if (!movieInfo.results.length) {
      return <p className="text-white text-xl animate-bounce sm:text-3xl mt-4">Filme não encontrado!!</p>
    }

    return (
      <>
        <MovieList movieList={movieInfo.results} />
        <Pagination movie={movieInfo} />
      </>
    );
  }

  function changeOrderBy(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue: FilterType = event.target.value as FilterType;
    paginationUtils?.setFilterType(selectedValue);
    resetPagination();
  }

  function changeSort(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedValue: FilterSort = event.target.value as FilterSort;
    paginationUtils?.setSortType(selectedValue);
    resetPagination();
  }

  function changeGenre(event: React.ChangeEvent<HTMLSelectElement>) {
    paginationUtils?.setGenreType(Number(event.target.value));
    resetPagination();
  }

  function resetPagination() {
    paginationUtils?.setIsLoading(true);
    paginationUtils?.changePage(1);
  }

  function renderList() {
    const defaultOrderValue = paginationUtils?.filterType ?  paginationUtils?.filterType : 'vote_average';
    const defaultSortValue = paginationUtils?.sortType ?  paginationUtils?.sortType : 'desc';
    const defaultGenreValue = paginationUtils?.genreType ?  paginationUtils?.genreType : 1;

    return (
      <>
        <Search />
        <div className="flex flex-wrap gap-0 justify-start items-start w-full sm:gap-4">
          <Filter
            filterList={filterOptions}
            defaultValue={defaultOrderValue}
            changeOption={changeOrderBy}
            filterTitle="Exibir por:"
          />
          <Filter
            filterList={genreOptions}
            defaultValue={defaultGenreValue}
            changeOption={changeGenre}
            filterTitle="Gênero:"
          />
          <Filter
            filterList={sortBy}
            defaultValue={defaultSortValue}
            changeOption={changeSort}
            filterTitle="Ordenar por:"
          />
        </div>
        {paginationUtils?.searchLoading && <SearchLoading />}
        {renderMovieArea()}
      </>
    )
  }

  return (
    <main className="bg-zinc-900 flex min-h-screen flex-col items-center px-2 transition-all ease duration-150 sm:px-8">
      <Hearder />
      {renderList()}
    </main>
  )
}
