"use client";

import { useEffect, useState } from "react";
import { movies, searchMovie } from "./services/movieList";
import { MovieList } from "./components/MovieList";
import { MovieResponseProps } from "./types/movieResponseType";
import { Pagination } from "./components/Pagination";
import { useMovie } from "./contexts/MovieContext";
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
  const movieUtils = useMovie();
  
  const [movieInfo, setMovieInfo] = useState<MovieResponseProps>(initialMovieInfo);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (movieUtils?.searchTxt) {
      getSearchMovies();
    } else {
      getMovies();
      goPageToTop();
    }
  }, [movieUtils?.page, movieUtils?.searchTxt, movieUtils?.filterType]);

  async function getMovies() {
    const allMovies: MovieResponseProps = await movies(movieUtils?.page, movieUtils?.filterType);
    setMovieInfo(allMovies);
    setIsLoading(false);
    movieUtils?.changeSearchLoading(false);
  }
  
  async function getSearchMovies() {
    const allSearchMovies: MovieResponseProps = await searchMovie(1, movieUtils?.searchTxt);
    setMovieInfo(allSearchMovies);
    movieUtils?.changeSearchLoading(false);
  }

  function goPageToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderMovieArea() {
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
    if (isLoading && !movieUtils?.searchTxt) {
      return <Loading />
    }

    return (
      <>
        <Search />
        <Filter />
        {movieUtils?.searchLoading && <SearchLoading />}
        {renderMovieArea()}
      </>
    )
  }

  return (
    <main className="bg-zinc-900 flex min-h-screen flex-col items-center px-2 transition-all ease duration-150 py-8 sm:px-8">
      {renderList()}
    </main>
  )
}
