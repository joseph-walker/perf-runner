import { Logger } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Device, DeviceInput, DeviceResult } from '../entities/device.entity';

@Resolver((of) => Device)
export class DeviceResolver {
	private readonly logger = new Logger(DeviceResolver.name);

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

	@Mutation((returns) => DeviceResult)
	async createDevice(@Args('input') deviceInput: DeviceInput) {
		this.logger.log(`createDevice(${deviceInput})`);
		try {
			await this.deviceRepository.save(deviceInput);

			return { ok: true };
		} catch (e) {
			this.logger.error(e);

			return { ok: false };
		}
	}

	@Mutation((returns) => DeviceResult)
	async updateDevice(@Args('input') deviceInput: DeviceInput) {
		this.logger.debug(`updateDevice(${JSON.stringify(deviceInput)})`);
		try {
			await this.deviceRepository.update({ id: deviceInput.id }, deviceInput);

			return { ok: true };
		} catch (e) {
			this.logger.error(e);

			return { ok: false };
		}
	}

	@Mutation((returns) => DeviceResult)
	async deleteDevice(@Args('id') deviceId: number) {
		try {
			await this.deviceRepository.delete({ id: deviceId });

			return { ok: true };
		} catch (e) {
			this.logger.error(e);

			return { ok: false };
		}
	}
}
