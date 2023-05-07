import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import FetchResourceResponseJob from './Job/FetchResourceResponseJob'
import WebpImageManipulationJob from './Job/WebpImageManipulationJob'
import ValidateCacheImageRequestRule from './Rule/ValidateCacheImageRequestRule'
import StoreResourceResponseToFileJob from './Job/StoreResourceResponseToFileJob'
import CacheImageResourceOperation from './Operation/CacheImageResourceOperation'
import MediaStreamImageRESTController from './API/Controller/MediaStreamImageRESTController'
import GenerateResourceIdentityFromRequestJob from './Job/GenerateResourceIdentityFromRequestJob'
import ValidateCacheImageRequestResizeTargetRule from './Rule/ValidateCacheImageRequestResizeTargetRule'

const controllers = [MediaStreamImageRESTController]

const operations = [CacheImageResourceOperation]

const jobs = [
	GenerateResourceIdentityFromRequestJob,
	FetchResourceResponseJob,
	StoreResourceResponseToFileJob,
	WebpImageManipulationJob
]

const rules = [ValidateCacheImageRequestRule, ValidateCacheImageRequestResizeTargetRule]

@Module({
	imports: [HttpModule],
	controllers,
	providers: [...jobs, ...rules, ...operations]
})
export default class MediaStreamModule {}
