import { join } from 'path';

import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LighthouseModule } from './lighthouse/lighthouse.module';

@Module({
	imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
		  driver: ApolloDriver,
		  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
		  sortSchema: true,
		}),
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
