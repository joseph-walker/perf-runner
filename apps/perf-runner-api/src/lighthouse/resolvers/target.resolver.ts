import { Args, Int, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Mutation } from '@nestjs/graphql/dist/decorators/mutation.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from '../entities/device.entity';
import { Run } from '../entities/run.entity';
import { Target, TargetResult } from '../entities/target.entity';
import { TargetStatistics } from '../models/target-statistics.model';

@Resolver((of) => Target)
export class TargetResolver {
	constructor(
		@InjectRepository(Target)
		private targetRepository: Repository<Target>,
		@InjectRepository(Run)
		private runRepository: Repository<Run>,
		@InjectRepository(Device)
		private deviceRepository: Repository<Device>,
	) {}

	@Query((returns) => Target)
	async target(@Args('id', { type: () => Int }) id: number) {
		return this.targetRepository.findOneByOrFail({ id });
	}

	@Query((returns) => [Target])
	async targets() {
		return this.targetRepository.find();
	}

	@ResolveField()
	async runs(@Parent() target: Target) {
		return this.runRepository
			.createQueryBuilder('run')
			.leftJoinAndSelect('run.target', 'target')
			.where('target.id = :id', { id: target.id })
			.getMany();
	}

	@ResolveField()
	async device(@Parent() target: Target) {
		return this.deviceRepository.findOneBy({ id: target.deviceId });
	}

	@ResolveField()
	async statistics(@Parent() target: Target) {
		// TODO: Requesting both statistics and runs will technically result in a double SELECT.
		// Could probably cache this. But TBH who cares. Postgres is fast.
		return new TargetStatistics(await this.runs(target));
	}

	@Mutation((returns) => TargetResult)
	async createTarget(
		@Args('numRuns') numRuns: number,
		@Args('url') url: string,
		@Args('deviceId', { type: () => Int }) deviceId: number,
	) {
		try {
			await this.targetRepository.save({
				url,
				deviceId,
				num_rums: numRuns,
			});

			return { ok: true };
		} catch (e) {
			console.error(e);

			return { ok: false };
		}
	}
}
