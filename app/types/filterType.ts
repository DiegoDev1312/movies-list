export type FilterType = 'vote_average' | 'popularity' | 'now_playing' | 'upcoming';

export type FilterSort = 'asc' | 'desc';

export type FilterList = {
    id: number;
    name: string;
    type: string | number;
}
