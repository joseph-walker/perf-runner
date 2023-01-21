import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
} from 'typeorm';

import { Target } from './target.entity';

@Entity('runs')
export class Run {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column()
	lighthouse_version: string;

	@Column()
	url: string;

	@Column()
	user_agent: string;

	@Column('float')
	first_contentful_paint: number;

	@Column('float')
	largest_contentful_paint: number;

	@Column('float')
	first_meaningful_aint: number;

	@Column('float')
	speed_index: number;

	@Column('float')
	total_blocking_time: number;

	@Column('float')
	max_potential_fid: number;

	@Column('float')
	cumulative_layout_shift: number;

	@Column('float')
	server_response_time: number;

	@Column('float')
	time_to_interactive: number;

	@Column('float')
	redirects: number;

	@Column('float')
	main_thread_work: number;

	@Column('float')
	bootup_time: number;

	@Column('float')
	network_rtt: number;

	@Column('float')
	network_latency: number;

	@Column()
	total_byte_weight: number;

	@Column()
	dom_nodes: number;

	@ManyToOne(() => Target, (target) => target.runs)
	target: Target;
}
