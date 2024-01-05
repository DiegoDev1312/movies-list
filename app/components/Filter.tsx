import { usePagination } from "../contexts/PaginationContext";
import { FilterType, FilterSort, FilterList } from "../types/filterType";

type FilterProps = {
    filterList: Array<FilterList>;
    changeOption: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    defaultValue: FilterType | FilterSort | number;
    filterTitle: string;
}

export function Filter({ filterList, changeOption, defaultValue, filterTitle }: FilterProps) {
    const paginationUtils = usePagination();

    function renderOptions() {
        return filterList.map((option) => {
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
        <div className="flex flex-col mt-3 w-full sm:w-auto" >
            <h1 className="text-white mb-1">{filterTitle}</h1>
            <select
                defaultValue={defaultValue}
                name="select"
                className='self-start w-full px-3 h-10 my-4outline-none rounded-md bg-zinc-600 text-white sm:w-64'
                onChange={changeOption}
            >
                {renderOptions()}
            </select>
        </div>
    );
}
