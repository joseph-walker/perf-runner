import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Run } from './entities/run.entity';
import { Target } from './entities/target.entity';
import { LighthouseService } from './lighthouse.service';

@Module({
	imports: [TypeOrmModule.forFeature([
		Run,
		Target
	])],
	exports: [TypeOrmModule],
	providers: [LighthouseService]
})
export class LighthouseModule {}
