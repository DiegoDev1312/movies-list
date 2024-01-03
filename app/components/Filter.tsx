import { usePagination } from "../contexts/PaginationContext";
import { FilterType } from "../types/filterType";
import { filterOptions } from "../utils/constants";

export function Filter() {
    const paginationUtils = usePagination();
    
    function changeOption(event: React.ChangeEvent<HTMLSelectElement>) {
        const selectedValue: FilterType = event.target.value as FilterType;
        paginationUtils?.changeLoading(true);
        paginationUtils?.changeFilterType(selectedValue);
        paginationUtils?.changePage(1);
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

    if (paginationUtils?.searchTxt) {
        return null;
    }

    return (
        <select
            defaultValue={paginationUtils?.filterType}
            name="select"
            className='self-start w-full h-10 my-4 px-3 outline-none rounded-md bg-zinc-600 text-white sm:w-64'
            onChange={changeOption}
        >
            {renderOptions()}
        </select>
    );
}
