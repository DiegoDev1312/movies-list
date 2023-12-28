"use client";

import { useEffect, useState } from "react";
import { movies, searchMovie } from "./services/movieList";
import { MovieList } from "./components/MovieList";
import { MovieResponseProps } from "./types/movieResponseType";
import { Pagination } from "./components/Pagination";
import { usePagination } from "./contexts/PaginationContext";
import { Loading } from "./components/Loading";
import { Search } from "./components/Search";
import { SearchLoading } from "./components/SearchLoading";
import { Filter } from "./components/Filter";

export default function Home() {
  const initialMovieInfo = {
    results: [],
    page: 0,
    total_pages: 0,
  };

  const paginationInfo = usePagination();
  const [movieInfo, setMovieInfo] = useState<MovieResponseProps>(initialMovieInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTxt, setSearchTxt] = useState('');
  const [filterType, setFilterType] = useState('top_rated');

  useEffect(() => {
    if (searchTxt) {
      getSearchMovies();
    } else {
      getMovies();
      goPageToTop();
    }
  }, [paginationInfo?.page, searchTxt, filterType]);

  async function getMovies() {
    const allMovies: MovieResponseProps = await movies(paginationInfo?.page, filterType);
    setMovieInfo(allMovies);
    setIsLoading(false);
    paginationInfo?.changeSearchLoading(false);
  }
  
  async function getSearchMovies() {
    const allSearchMovies: MovieResponseProps = await searchMovie(1, searchTxt);
    setMovieInfo(allSearchMovies);
    paginationInfo?.changeSearchLoading(false);
  }

  function goPageToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderList() {
    if (isLoading) {
      return <Loading />
    }

    return (
      <>
        <Search setSearchTxt={setSearchTxt} />
        <Filter setFilterValue={setFilterType} />
        {paginationInfo?.searchLoading && <SearchLoading />}
        <MovieList movieList={movieInfo.results} />
        <Pagination movieInfo={movieInfo} />
      </>
    )
  }

  return (
    <main className="bg-zinc-900 flex min-h-screen flex-col items-center px-2 transition-all ease duration-150 py-8 sm:px-8">
      {renderList()}
    </main>
  )
}
