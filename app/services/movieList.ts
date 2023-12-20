import { api } from "../utils/api";

export async function movies(page: number | undefined) {
    const response = await api.get(`3/movie/top_rated?api_key=cfea2ebfa1332b46de22d3e69bc6c1df&page=${page}`);

    return response.data;
}