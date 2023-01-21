import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";

import { Run } from "./run.entity";

@Entity("targets")
export class Target {
	@PrimaryGeneratedColumn()
	id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@Column("smallint")
	num_runs: number;

	@Column()
	url: string;

	@OneToMany(() => Run, (run) => run.target)
	runs: Run[];
}
