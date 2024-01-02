export type GenreType = {
    id: number;
    name: string;
}

export type ProductionCompanyType = {
    id: number;
    logo_path: string;
    name: string;
}

export type DetailsType = {
    poster_path: string;
    revenue: number;
    budget: number;
    production_companies: Array<ProductionCompanyType>;
    title: string;
    genres: Array<GenreType>;
    runtime: number;
    overview: string;
    vote_average: number;
}
