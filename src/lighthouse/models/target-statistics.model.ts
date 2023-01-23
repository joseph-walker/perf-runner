import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Statistic } from './statistic.model';
import { Run } from '../entities/run.entity';

@ObjectType()
export class TargetStatistics {
	// TODO: Would it be better to inject the run repository and do the statistic
	// calculation within Postgres queries instead of loading them into memory and doing
	// it in JS?
	constructor(private readonly runs: Run[]) {}

	@Field((type) => Int)
	get count(): number {
		return this.runs.length;
	}

	@Field((type) => Statistic)
	get first_contentful_paint(): Statistic {
		const mean =
			this.runs
				.map((run) => run.first_contentful_paint)
				.reduce((a, b) => a + b, 0) / this.runs.length;

		return {
			mean,
		};
	}

	@Field((type) => Statistic)
	get final_score(): Statistic {
		const mean =
			this.runs
				.map((run) => run.final_score)
				.reduce((a, b) => a + b, 0) / this.runs.length;

		return {
			mean,
		};
	}
}
