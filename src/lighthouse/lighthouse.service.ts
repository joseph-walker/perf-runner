import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer';

import { Target } from './entities/target.entity';
import { Run } from './entities/run.entity';

@Injectable()
export class LighthouseService {
	constructor(
		@InjectRepository(Target)
		private targetRepository: Repository<Target>,
		@InjectRepository(Run)
		private runRepository: Repository<Run>,
	) {
		this.doRun();
	}

	private async scheduleNextRun() {
		setTimeout(() => {
			// this.doRun();
		}, 5_000);
	}

	private async doRun() {
		try {
			const target = await this.getNextTarget();

			const browser = await puppeteer.launch({
				headless: true,
				defaultViewport: null,
			});

			const { lhr: lighthouseReport } = await lighthouse(target.url, {
				port: parseInt(new URL(browser.wsEndpoint()).port, 10),
				output: ['json'],
				onlyCategories: ['performance'],
				skipAudits: ['final-screenshot', 'full-page-screenshot']
			});

			await browser.close();

			await this.saveRun(target, lighthouseReport);
			await this.touchTarget(target);
		} catch (err) {
			switch (true) {
				case err instanceof EntityNotFoundError: {
					// Handle missing target error
					break;
				}
				default: {
					// Handle unknown error
					console.error(err);
					break;
				}
			}
		} finally {
			this.scheduleNextRun();
		}
	}

	private async saveRun(
		target: Target,
		report: Awaited<ReturnType<typeof lighthouse>>['lhr'],
	) {
		const newRun = new Run();

		// Save some metadata from the run
		newRun.lighthouse_version = report.lighthouseVersion;
		newRun.user_agent = report.userAgent;

		// Save all the relevant reporting metrics
		newRun.first_contentful_paint =
			report.audits['first-contentful-paint'].numericValue;
		newRun.largest_contentful_paint =
			report.audits['largest-contentful-paint'].numericValue;
		newRun.first_meaningful_aint =
			report.audits['first-meaningful-paint'].numericValue;
		newRun.speed_index = report.audits['speed-index'].numericValue;
		newRun.total_blocking_time =
			report.audits['total-blocking-time'].numericValue;
		newRun.max_potential_fid =
			report.audits['max-potential-fid'].numericValue;
		newRun.cumulative_layout_shift =
			report.audits['cumulative-layout-shift'].numericValue;
		newRun.server_response_time =
			report.audits['server-response-time'].numericValue;
		newRun.time_to_interactive = report.audits['interactive'].numericValue;
		newRun.redirects = report.audits['redirects'].numericValue;
		newRun.main_thread_work =
			report.audits['mainthread-work-breakdown'].numericValue;
		newRun.bootup_time = report.audits['bootup-time'].numericValue;
		newRun.network_rtt = report.audits['network-rtt'].numericValue;
		newRun.network_latency =
			report.audits['network-server-latency'].numericValue;
		newRun.total_byte_weight =
			report.audits['total-byte-weight'].numericValue;
		newRun.dom_nodes = report.audits['dom-size'].numericValue;

		// Construct the Run <-> Target relation
		newRun.target = target;

		await this.runRepository.save(newRun);
	}

	private async touchTarget(target: Target) {
		if (target.num_runs > 0) {
			target.num_runs--;
		} else {
			// Target is infinite; don't reduce run count
		}

		await this.targetRepository.save(target);
	}

	private async getNextTarget(): Promise<Target> {
		const nextTarget = await this.targetRepository
			.createQueryBuilder()
			.where('num_runs <> 0')
			.orderBy('updated_at', 'ASC')
			.getOneOrFail();

		return nextTarget;
	}
}
