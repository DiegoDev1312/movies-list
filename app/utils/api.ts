import axios from "axios";

export const api = axios.create({
    baseURL: 'https://api.themoviedb.org',
    params: {
        api_key: 'cfea2ebfa1332b46de22d3e69bc6c1df',
    }
});
