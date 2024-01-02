import { useMovie } from "../contexts/MovieContext";
import { FilterType } from "../types/filterType";
import { filterOptions } from "../utils/constants";

export function Filter() {
    const movieUtils = useMovie();
    
    function changeOption(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValue: FilterType = event.target.value as FilterType;
        movieUtils?.changeSearchLoading(true);
        movieUtils?.changeFilterType(selectedValue);
        movieUtils?.changePage(1);
    }

    function renderOptions() {
        return filterOptions.map((option) => {
            return (
                <option value={option.type} key={option.id}>
                    {option.name}
                </option>
            );
        });
    }

    if (movieUtils?.searchTxt) {
        return null;
    }

    return (
        <select
            defaultValue={movieUtils?.filterType}
            name="select"
            className='self-start w-full h-10 my-4 px-3 mb-7 outline-none rounded-md bg-zinc-600 text-white sm:w-64'
            onChange={changeOption}
        >
            {renderOptions()}
        </select>
    );
}