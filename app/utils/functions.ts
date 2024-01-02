export function convertCurrency(currency: number) {
    return currency > 0 ? currency.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    }) : '-';
}

export function apiImage(url: string) {    
    return url ? `https://image.tmdb.org/t/p/w500/${url}` : '/void-image.svg';
}
