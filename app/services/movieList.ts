import { addMonths, subDays, addDays, lightFormat } from 'date-fns';

import { FilterType, FilterSort } from "../types/filterType";
import { api } from "../utils/api";

export async function movies(
    page: number = 1,
    filterType: FilterType = 'vote_average',
    filterSort: FilterSort = 'desc',
    genreId: number = 1,
) {
    const voteCountCodition = filterType === 'vote_average' || filterType === 'popularity' ? 300 : null;
    const sortByCodition = filterType === 'now_playing' || filterType === 'popularity' ? 'popularity' : 'vote_average';

    const defaultDateFormat =  'yyyy-MM-dd';
    const actualDate = lightFormat(new Date(), defaultDateFormat);
    const releasedateGte = filterType === 'now_playing'
        ? subDays(actualDate, 40) : addDays(actualDate, 1);
    const releasedateLte = filterType === 'now_playing'
        ? addDays(actualDate, 6) : addDays(actualDate, 40);

    const response = await api.get(`3/discover/movie`, {
        params: {
            api_key: 'cfea2ebfa1332b46de22d3e69bc6c1df',
            page,
            with_genres: genreId !== 1 ? genreId : null,
            include_adult: false,
            language: 'pt-BR',
            include_video: false,
            sort_by: `${sortByCodition}.${filterSort}`,
            'vote_average.lte': 10,
            'vote_count.gte': voteCountCodition,
            'release_date.gte': filterType === 'now_playing' || filterType === 'upcoming'
                ? lightFormat(releasedateGte, defaultDateFormat) : null,
            'release_date.lte': filterType === 'now_playing' || filterType === 'upcoming'
                ? lightFormat(releasedateLte, defaultDateFormat)  : null,
            watch_region: filterType === 'now_playing' ? 'BR' : null,
        }
    });

    return response.data;
}


export async function searchMovie(page: number = 1, searchTxt?: string) {
    const response = await api.get(`3/search/movie`, {
        params: {
            page,
            api_key: 'cfea2ebfa1332b46de22d3e69bc6c1df',
            query: searchTxt,
            language: 'pt-BR',
        }
    });

    return response.data;
}


export async function movieDetails(id: string) {
    const response = await api.get(`3/movie/${id}`, {
        params: {
            api_key: 'cfea2ebfa1332b46de22d3e69bc6c1df',
            language: 'pt-BR',
        },
    });

    return response.data;
}

