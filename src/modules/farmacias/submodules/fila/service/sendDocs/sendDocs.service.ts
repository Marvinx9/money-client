import { http } from "@api/https";
import { AxiosInstance } from "axios";
import { SendDocsInputDto } from "./sendDocs.dto";

class SendDocsService {
	constructor(private readonly client: AxiosInstance) { }

	async execute(dto: SendDocsInputDto): Promise<void> {
		await this.client.post("/laudos", { ...dto });
	}
}

const sendDocsService = new SendDocsService(http);

export { sendDocsService, SendDocsService };