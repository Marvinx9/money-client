import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { SearchBeneficiarioInputDto, SearchBeneficiarioOutputDto } from "./searchBeneficiario.dto";

class SearchBeneficiarioService {
    constructor(private readonly api: AxiosInstance) { }

    async execute(params: SearchBeneficiarioInputDto): Promise<SearchBeneficiarioOutputDto[]> {
        const response = await this.api.get<SearchBeneficiarioOutputDto[]>(
            "/beneficiario",
            { params: params }
        );
        return response.data;
    }
}

const searchBeneficiarioService = new SearchBeneficiarioService(http);

export { searchBeneficiarioService, SearchBeneficiarioService };
