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
  }, [paginationUtils?.page, paginationUtils?.searchTxt, paginationUtils?.filterType]);

  async function getMovies() {
    const allMovies: MovieResponseProps = await movies(paginationUtils?.page, paginationUtils?.filterType);
    setMovieInfo(allMovies);
    paginationUtils?.changeLoading(false);
    paginationUtils?.changeSearchLoading(false);
  }
  
  async function getSearchMovies() {
    const allSearchMovies: MovieResponseProps = await searchMovie(paginationUtils?.page, paginationUtils?.searchTxt);
    setMovieInfo(allSearchMovies);
    paginationUtils?.changeSearchLoading(false);
  }

  function goPageToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMovieArea() {
    if (paginationUtils?.isLoading && !paginationUtils?.searchTxt) {
      return <Loading />
    }

    if (!movieInfo.results.length) {
      return <p className="text-white text-xl animate-bounce sm:text-3xl mt-4">Movie not found!!</p>
    }

    return (
      <>
        <MovieList movieList={movieInfo.results} />
        <Pagination movie={movieInfo} />
      </>
    );
  }

  function renderList() {
    return (
      <>
        <Search />
        <Filter />
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
