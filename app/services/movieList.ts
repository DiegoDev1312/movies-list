import { FilterType } from "../types/filterType";
import { api } from "../utils/api";

export async function movies(page: number = 1, filterType: FilterType = 'top_rated') {
    const response = await api.get(`3/movie/${filterType}`, {
        params: {
            page,
            api_key: 'cfea2ebfa1332b46de22d3e69bc6c1df',
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
        }
    });

    return response.data;
}


export async function movieDetails(id: string) {
    const response = await api.get(`3/movie/${id}`, {
        params: {
            api_key: 'cfea2ebfa1332b46de22d3e69bc6c1df',
        },
    });

    return response.data;
}

