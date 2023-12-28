import { usePagination } from "../contexts/PaginationContext";

type FilterType = {
    setFilterValue: (filterValue: string) => void; 
}

export function Filter({ setFilterValue }: FilterType) {
    const paginationInfo = usePagination();

    function changeOption(event: React.ChangeEvent<HTMLSelectElement>) {
        paginationInfo?.changeSearchLoading(true);
        setFilterValue(event.target.value);
        paginationInfo?.changePage(1);
    }

    return (
        <select name="select" className='self-start w-full h-10 my-4 px-3 mb-7 outline-none rounded-md bg-zinc-600 text-white sm:w-64' onChange={changeOption}>
            <option value="top_rated" selected>Melhores avaliados</option>
            <option value="popular">Populares</option>
            <option value="now_playing">Em cartaz</option>
            <option value="upcoming">À serem lançado</option>
        </select>
    );
}