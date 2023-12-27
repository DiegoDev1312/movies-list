"use client";

import { useEffect, useRef, useState } from "react";
import { movies, searchMovie } from "./services/movieList";
import { MovieList } from "./components/MovieList";
import { MovieResponseProps } from "./types/movieResponseType";
import { Pagination } from "./components/Pagination";
import { usePagination } from "./contexts/PaginationContext";
import { Loading } from "./components/Loading";
import { Search } from "./components/Search";

export default function Home() {
  const mainPageRef = useRef<HTMLDivElement>(null);
  const initialMovieInfo = {
    results: [],
    page: 0,
    total_pages: 0,
  };

  const paginationInfo = usePagination();
  const [movieInfo, setMovieInfo] = useState<MovieResponseProps>(initialMovieInfo);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTxt, setSearchTxt] = useState('');

  useEffect(() => {
    if (searchTxt) {
      getSearchMovies();
    } else {
      getMovies();
      goPageToTop();
    }
  }, [paginationInfo?.page, searchTxt]);

  async function getMovies() {
    const allMovies: MovieResponseProps = await movies(paginationInfo?.page);
    setMovieInfo(allMovies);
    setIsLoading(false);
  }

  async function getSearchMovies() {
      const allSearchMovies: MovieResponseProps = await searchMovie(1, searchTxt);
      setMovieInfo(allSearchMovies);
  }

  function goPageToTop() {
    console.log('entrou');
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderList() {
    if (isLoading) {
      return <Loading />
    }

    return (
      <>
        <Search setSearchTxt={setSearchTxt} />
        <MovieList movieList={movieInfo.results} />
        <Pagination movieInfo={movieInfo} />
      </>
    )
  }

  return (
    <main className="bg-white flex min-h-screen flex-col items-center justify-between px-8 transition-all ease duration-150 py-8">
      {renderList()}
    </main>
  )
}
