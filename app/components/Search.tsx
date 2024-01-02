import { useMovie } from '../contexts/MovieContext';

export function Search() {
    const movieUtils = useMovie();

    return (
        <input
            onChange={movieUtils?.changeSearch}
            className="rounded-md h-10 text-white dark:text-white bg-zinc-600 outline-none pl-3 placeholder:text-white w-full"
            placeholder="Digite o nome do filme..."
            defaultValue={movieUtils?.searchTxt}
        />
    );
}