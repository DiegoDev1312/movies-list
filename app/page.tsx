"use client";

import { useEffect, useRef, useState } from "react";
import { movies } from "./services/movieList";
import { MovieList } from "./components/MovieList";
import { MovieResponseProps } from "./types/movieResponseType";
import { Pagination } from "./components/Pagination";
import { usePagination } from "./contexts/PaginationContext";

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
  
  useEffect(() => {
    getMovies();
    goPageToTop();
  }, [paginationInfo?.page]);

  async function getMovies() {
    const allMovies: MovieResponseProps = await movies(paginationInfo?.page);
    setMovieInfo(allMovies);
    setIsLoading(false);
  }

  function goPageToTop() {
    console.log('entrou');
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function renderList() {
    if (isLoading) {
      return <p>Carregando...</p>
    }

    return (
      <>
        <MovieList movieList={movieInfo.results} />
        <Pagination movieInfo={movieInfo} />
      </>
    )
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-8 transition-all ease duration-150 py-8">
      {renderList()}
    </main>
  )
}
