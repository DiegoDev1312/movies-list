"use client";

import { movieDetails } from '@/app/services/movieList';
import { DetailsType } from '@/app/types/detailsType';
import { apiImage, convertCurrency } from '@/app/utils/functions';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FiArrowLeft } from "react-icons/fi";
import { useRouter } from 'next/navigation';
import { Loading } from '@/app/components/Loading';
import { MovieGenre } from '@/app/components/MovieGenre';
import { ProductionCompanies } from '@/app/components/ProductionCompanies';

function MovieDetails() {
    const params = useParams<{ id: string }>();
    const router = useRouter();

    const [details, setDetails] = useState<DetailsType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getMovieDetails();
    }, []);

    async function getMovieDetails() {
        const response = await movieDetails(params.id);
        setDetails(response);
        setIsLoading(false);
    }

    function renderInfo(title: string, txt: string, personalStyle?: string) {
        return (
            <div>
                <p className={`text-lg text-yellow-500 ${personalStyle} mt-3 md:text-2xl`}>{title}</p>
                <p className={`text-lg text-white ${personalStyle} mt-3 md:text-2xl`}>{txt}</p>
            </div>
        );
    }

    function renderDetails() {
        if (isLoading) {
            return <Loading />
        }
        
        return (
            <div className='w-11/12 items-start flex justify-center flex-col xl:w-2/4'>
                <button className='self-start' onClick={() => router.back()}>
                    <FiArrowLeft color="#FFFFFF" className='w-8 h-8 md:w-12 md:h-12' />
                </button>
                <div className='gap-4 mt-4 justify-center items-center w-full md:flex'>
                    <img className='self-center h-72 object-contain w-full sm:w-auto' src={apiImage(details?.poster_path || '')} />
                    <div className='flex-1'>
                        {renderInfo('', `${details?.title}`, 'text-yellow-600')}
                        {renderInfo('', `${details?.overview}`, '')}
                    </div>
                </div>
                <div className='flex gap-4 mt-3 flex-wrap'>
                    <MovieGenre genreList={details?.genres} /> 
                </div>
                <div className='flex items-start justify-start flex-col w-full'>
                    {renderInfo('Budget:', `${convertCurrency(details?.budget || 0)}`)}
                    {renderInfo('Revenue:', `${convertCurrency(details?.revenue || 0)}`)}
                    {renderInfo('Vote average:', details?.vote_average ? `${details?.vote_average.toFixed(1)}` : '-')}
                    {renderInfo('Runtime:', details?.runtime ? `${details?.runtime} minutes` : '-')}
                    {renderInfo('Production Companies:', '')}
                    <div className='w-full grid gap-3 grid-cols-[repeat(auto-fill,minmax(150px,1fr))]'>
                        <ProductionCompanies productionCompanyList={details?.production_companies} />
                    </div> 
                </div>
            </div>
        );
    }

    return (
        <div className='bg-zinc-900 flex items-center min-h-screen justify-center flex-col py-2'>
            {renderDetails()}
        </div>
    );
}

export default MovieDetails;
