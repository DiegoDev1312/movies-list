type SearchProps = {
    setSearchTxt: (txt: string) => void;
}

export function Search({ setSearchTxt }: SearchProps) {
    function changeTxt(event: React.ChangeEvent<HTMLInputElement>) {
        setSearchTxt(event.target.value);

    }

    return (
        <div className="border border-white rounded-md w-full mb-7 text-white">
            <input onChange={changeTxt} className="w-full h-10 outline-none pl-3 placeholder:text-white" placeholder="Digite o nome do filme..." />
        </div>
    );
}