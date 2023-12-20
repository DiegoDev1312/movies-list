import { MovieListProps } from "./movieListType"

export type MovieResponseProps = {
    results: MovieListProps[],
    page: number;
    total_pages: number;
}
