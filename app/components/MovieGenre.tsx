import { GenreType } from "../types/detailsType";

export function MovieGenre({ genreList }: { genreList: Array<GenreType> | undefined }) {
    return genreList?.map((genre) => {
        return (
            <div className='border flex items-center justify-center px-3 h-6 text-sm border-yellow-500 rounded-xl' key={genre?.id}>
                <p className='text-white'>{genre?.name}</p>
            </div>
        );
    });
}
