import { FaHeart } from "react-icons/fa";
import { useMovie } from "../contexts/MovieContext";
import Link from "next/link";

export function Hearder() {
    const movieUtils = useMovie();

    return (
        <header className="bg-zinc-900 items-center pt-3 flex justify-between h-16 w-full">
            <h1 className="text-white text-xl sm:text-3xl">MoviesList</h1>
            <Link className="flex items-center justify-center gap-3" href='/favoriteMovies'>
                <p className="text-white text-xl">Favs</p>
                <div className="relative">
                    <FaHeart size={30} color='#DE281A' />
                    <div className="p-2 rounded-full flex items-center font-bold justify-center text-xs text-white absolute top-0 right-0 left-0 bottom-0">
                        {movieUtils?.favoriteList.length}
                    </div>
                </div>
            </Link>
        </header>
    );
}