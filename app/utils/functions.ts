export function convertCurrency(currency: number) {
    return currency > 0 ? currency.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }) : '-';
}

export function apiImage(url: string) {    
    return url ? `https://image.tmdb.org/t/p/w500/${url}` : '/void-image.svg';
}

export function updateFavoriteList(movieId: number) {
    const favoriteList = JSON.parse(localStorage.getItem('@favorite_list') || '[]');
    const newFavoriteList = favoriteList.includes(movieId) ?
        favoriteList.filter((favoriteId: number) => favoriteId !== movieId)
        : [...favoriteList, movieId];

    localStorage.setItem('@favorite_list', JSON.stringify(newFavoriteList));
    return newFavoriteList;
}
