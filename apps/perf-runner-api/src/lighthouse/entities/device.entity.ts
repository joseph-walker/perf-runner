import { Field, Float, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Target } from './target.entity';

export enum FormFactor {
	Desktop = 'desktop',
	Mobile = 'mobile',
}

registerEnumType(FormFactor, {
	name: 'FormFactor',
});

@ObjectType()
@Entity('devices')
export class Device {
	@Field((type) => Int)
	@PrimaryGeneratedColumn()
	id: number;

	@Field((type) => Date)
	@CreateDateColumn()
	created_at: Date;

	@Field((type) => Date)
	@UpdateDateColumn()
	updated_at: Date;

	@Field()
	@Column()
	name: string;

	@Field((type) => FormFactor)
	@Column({ type: 'enum', enum: FormFactor })
	form_factor: FormFactor;

	@Field((type) => Int)
	@Column('smallint')
	screen_width: number;

	@Field((type) => Int)
	@Column('smallint')
	screen_height: number;

	@Field((type) => Float)
	@Column('float')
	scale_factor: number;

	@Field((type) => Int)
	@Column('smallint')
	cpu_slowdown_factor: number;

	@Field((type) => Int)
	@Column('int')
	request_latency_ms: number;

	@Field((type) => Int)
	@Column('int')
	round_trip_time_ms: number;

	@Field((type) => Int)
	@Column('int')
	download_throughput_kbps: number;

	@Field((type) => Int)
	@Column('int')
	upload_throughput_kbps: number;

	@OneToMany(() => Target, (target) => target.device)
	targets: Target[];
}
