import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
	ManyToOne,
} from 'typeorm';

import { Run } from './run.entity';
import { TargetStatistics } from '../models/target-statistics.model';
import { Device } from './device.entity';

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

    @Column()
    deviceId: number

	@Field((type) => Device)
	@ManyToOne(() => Device, (device) => device.targets)
	device: Device

	@Field((type) => TargetStatistics)
	statistics: TargetStatistics
}
