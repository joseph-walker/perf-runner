import { Query, Args, Int, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device } from '../entities/device.entity';

@Resolver((of) => Device)
export class DeviceResolver {
	constructor(
		@InjectRepository(Device)
		private deviceRepository: Repository<Device>,
	) {}

	@Query((returns) => Device)
	async device(@Args('id', { type: () => Int }) id: number) {
		return this.deviceRepository.findOne({ where: { id } });
	}

	@Query((returns) => [Device])
	async devices() {
		return this.deviceRepository.find();
	}
}
