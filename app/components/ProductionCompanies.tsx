import { ProductionCompanyType } from "../types/detailsType";
import { apiImage } from "../utils/functions";

export function ProductionCompanies({ productionCompanyList  }: { productionCompanyList: Array<ProductionCompanyType> | undefined }) {
    return productionCompanyList?.map((company) => {
        return (
            <div key={company?.id} className="bg-white/15 text-center flex items-center justify-center flex-col rounded-lg py-2">
                <img className="h-20 w-20 object-contain" src={apiImage(company.logo_path)} />
                <p className='text-white text-xs mt-2'>{company?.name}</p>
            </div>
        );
    });
}
