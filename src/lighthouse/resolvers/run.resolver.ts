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

@Resolver((of) => Run)
export class RunResolver {
	constructor(
		@InjectRepository(Run)
		private runRepository: Repository<Run>,
		@InjectRepository(Target)
		private targetRepository: Repository<Target>,
	) {}

	@Query((returns) => Run)
	async run(@Args('id', { type: () => Int }) id: number) {
		return this.runRepository.findOne({ where: { id } });
	}

	@ResolveField()
	async target(@Parent() run: Run) {
		return this.targetRepository
			.createQueryBuilder('target')
			.leftJoinAndSelect('target.runs', 'run')
			.where('run.id = :id', { id: run.id })
			.getOne();
	}
}
