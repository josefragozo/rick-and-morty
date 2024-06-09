import { Body, Controller, Get, Post } from "@nestjs/common";
import { PassthroughDto } from "src/dtos/request/paththrough.request";
import { GraphqlRickAnMortyService } from "src/services/graphql.rnm.service";

@Controller('passthrough')
export class PassthroughController {

    constructor(private service: GraphqlRickAnMortyService) {}

    @Post()
	public async SendQuery(@Body() request: PassthroughDto) {
        return await this.service.executeQuery(request.content);
	}	

	@Get()
	public async getDefault() { 
        return await this.service.getDefault();
	}
}