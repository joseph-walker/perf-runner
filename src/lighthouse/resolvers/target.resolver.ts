import {
	Query,
	Args,
	Int,
	Resolver,
	ResolveField,
	Parent,
} from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Run } from '../entities/run.entity';
import { Target } from '../entities/target.entity';
import { TargetStatistics } from '../models/target-statistics.model';

@Resolver((of) => Target)
export class TargetResolver {
	constructor(
		@InjectRepository(Target)
		private targetRepository: Repository<Target>,
		@InjectRepository(Run)
		private runRepository: Repository<Run>,
	) {}

	@Query((returns) => Target)
	async target(@Args('id', { type: () => Int }) id: number) {
		return this.targetRepository.findOneByOrFail({ id });
	}

	@ResolveField()
	async runs(@Parent() target: Target) {
		return this.runRepository
			.createQueryBuilder('run')
			.leftJoinAndSelect('run.target', 'target')
			.where("target.id = :id", { id: target.id })
			.getMany();
	}

	@ResolveField()
	async statistics(@Parent() target: Target) {
		// TODO: Requesting both statistics and runs will technically result in a double SELECT.
		// Could probably cache this. But TBH who cares. Postgres is fast.
		return new TargetStatistics(await this.runs(target));
	}
}
