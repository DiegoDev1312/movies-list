import { ProductionCompanyType } from "../types/detailsType";
import { apiImage } from "../utils/functions";

export function ProductionCompanies({ productionCompanyList  }: { productionCompanyList: Array<ProductionCompanyType> | undefined }) {
    return productionCompanyList?.map((company) => {
        return (
            <div key={company?.id} className="bg-white">
                <img className="h-20 w-20 object-contain" src={apiImage(company.logo_path)} />
                <p className='text-white'>{company?.name}</p>
            </div>
        );
    });
}