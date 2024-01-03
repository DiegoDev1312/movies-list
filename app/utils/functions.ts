import { MovieListProps } from "../types/movieListType";

export function convertCurrency(currency: number) {
    return currency > 0 ? currency.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }) : '-';
}

export function apiImage(url: string) {    
    return url ? `https://image.tmdb.org/t/p/w500/${url}` : '/void-image.svg';
}

export function updateFavoriteList(movie: MovieListProps) {
    const favoriteList = JSON.parse(localStorage.getItem('@favorite_list') || '[]');
    const favoriteMovieId = favoriteList.map((favorite: MovieListProps) => favorite.id); 

    const newFavoriteList = favoriteMovieId.includes(movie.id) ?
        favoriteList.filter((favoriteMovie: MovieListProps) => favoriteMovie.id !== movie.id)
        : [...favoriteList, movie];

    localStorage.setItem('@favorite_list', JSON.stringify(newFavoriteList));
    return newFavoriteList;
}
