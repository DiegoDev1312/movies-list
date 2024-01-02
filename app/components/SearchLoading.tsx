export function SearchLoading() {
    return (
        <div className='flex gap-2 mb-12 mt-4'>
            <div className='h-3 w-3 animate-pulseLoading rounded-full bg-green-500'></div>
            <div className='h-3 w-3 animate-pulseLoading delay-500 rounded-full bg-green-500'></div>
            <div className='h-3 w-3 animate-pulseLoading delay-1000 rounded-full bg-green-500'></div>
        </div>
    );
}