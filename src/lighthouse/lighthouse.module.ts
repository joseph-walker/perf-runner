import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Run } from './entities/run.entity';
import { Target } from './entities/target.entity';
import { LighthouseService } from './lighthouse.service';
import { RunResolver } from './resolvers/run.resolver';
import { TargetResolver } from './resolvers/target.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([
		Run,
		Target
	])],
	exports: [TypeOrmModule],
	providers: [LighthouseService, TargetResolver, RunResolver]
})
export class LighthouseModule {}
