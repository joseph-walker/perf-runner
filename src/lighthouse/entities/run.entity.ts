import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';

import { Target } from './target.entity';

@ObjectType()
@Entity('runs')
export class Run {
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
	lighthouse_version: string;

	@Field()
	@Column()
	user_agent: string;

	@Field((type) => Float)
	@Column('float')
	first_contentful_paint: number;

	@Field((type) => Float)
	@Column('float')
	largest_contentful_paint: number;

	@Field((type) => Float)
	@Column('float')
	first_meaningful_aint: number;

	@Field((type) => Float)
	@Column('float')
	speed_index: number;

	@Field((type) => Float)
	@Column('float')
	total_blocking_time: number;

	@Field((type) => Float)
	@Column('float')
	max_potential_fid: number;

	@Field((type) => Float)
	@Column('float')
	cumulative_layout_shift: number;

	@Field((type) => Float)
	@Column('float')
	server_response_time: number;

	@Field((type) => Float)
	@Column('float')
	time_to_interactive: number;

	@Field((type) => Float)
	@Column('float')
	redirects: number;

	@Field((type) => Float)
	@Column('float')
	main_thread_work: number;

	@Field((type) => Float)
	@Column('float')
	bootup_time: number;

	@Field((type) => Float)
	@Column('float')
	network_rtt: number;

	@Field((type) => Float)
	@Column('float')
	network_latency: number;

	@Field((type) => Int)
	@Column()
	total_byte_weight: number;

	@Field((type) => Int)
	@Column()
	dom_nodes: number;

	@Field((type) => Target)
	@ManyToOne(() => Target, (target) => target.runs)
	target: Target;
}
