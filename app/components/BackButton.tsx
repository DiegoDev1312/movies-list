import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from "next/navigation";

export function BackButton() {
    const router = useRouter();

    return (
        <button className='self-start flex items-center gap-3' onClick={() => router.back()}>
            <FiArrowLeft color="#FFFFFF" className='w-8 h-8 md:w-12 md:h-12' />
            <p className="text-white text-lg sm:text-2xl">Back</p>
        </button>
    );
}