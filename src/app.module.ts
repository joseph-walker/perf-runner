import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LighthouseModule } from './lighthouse/lighthouse.module';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			database: 'lighthouse',
			username: 'lighthouse',
			password: 'lighthouse-root',
			synchronize: true,
			logging: true,
			entities: ["./**/*.entity.js"],
			subscribers: [],
			migrations: [],
		}),
		LighthouseModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
