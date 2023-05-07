import { AxiosResponse } from 'axios'
import { HttpService } from '@nestjs/axios'
import { Injectable, Scope } from '@nestjs/common'
import CacheImageRequest from '../API/DTO/CacheImageRequest'
import UnableToFetchResourceException from '../API/Exception/UnableToFetchResourceException'

@Injectable({ scope: Scope.REQUEST })
export default class FetchResourceResponseJob {
	constructor(private readonly httpService: HttpService) {}

	async handle(request: CacheImageRequest): Promise<AxiosResponse> {
		const response = await this.httpService.axiosRef({
			url: request.resourceTarget,
			method: 'GET',
			responseType: 'stream'
		})

		if (200 !== response.status)
			throw new UnableToFetchResourceException(request.resourceTarget)

		return response
	}
}
