import { NestFactory } from '@nestjs/core'
import MediaStreamModule from './MediaStreamModule'

async function bootstrap() {
	const app = await NestFactory.create(MediaStreamModule)
	await app.listen(3003)
}
bootstrap()
