import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';

import { Run } from './run.entity';
import { TargetStatistics } from '../models/target-statistics.model';

@ObjectType()
@Entity('targets')
export class Target {
	@Field((type) => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field((type) => Date)
	@CreateDateColumn()
	created_at: Date;

	@Field((type) => Date)
	@UpdateDateColumn()
	updated_at: Date;

	@Field((type) => Int)
	@Column('smallint')
	num_runs: number;

	@Field()
	@Column()
	url: string;

	@Field((type) => [Run])
	@OneToMany(() => Run, (run) => run.target)
	runs: Run[];

	@Field((type) => TargetStatistics)
	statistics: TargetStatistics
}
