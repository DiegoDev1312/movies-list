import { debounce } from 'lodash';
import { usePagination } from '../contexts/PaginationContext';

type SearchProps = {
    setSearchTxt: (txt: string) => void;
}

export function Search({ setSearchTxt }: SearchProps) {
    const paginationInfo = usePagination();

    function searchTxt(event: React.ChangeEvent<HTMLInputElement>) {
        paginationInfo?.changeSearchLoading(true);
        debounceChangeTxt(event.target.value);
    }

    const debounceChangeTxt =
        debounce((text: string) => {
            setSearchTxt(text);
            paginationInfo?.changePage(1);
        }, 1000);

    return (
        <input
            onChange={searchTxt}
            className="rounded-md h-10 text-white dark:text-white bg-zinc-600 outline-none pl-3 placeholder:text-white w-full"
            placeholder="Digite o nome do filme..."
        />
    );
}