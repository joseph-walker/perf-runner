import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Device } from './entities/device.entity';
import { Run } from './entities/run.entity';
import { Target } from './entities/target.entity';
import { LighthouseService } from './lighthouse.service';
import { DeviceResolver } from './resolvers/device.resolver';
import { RunResolver } from './resolvers/run.resolver';
import { TargetResolver } from './resolvers/target.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Run, Target, Device])],
	exports: [TypeOrmModule],
	providers: [LighthouseService, TargetResolver, RunResolver, DeviceResolver],
})
export class LighthouseModule {}
