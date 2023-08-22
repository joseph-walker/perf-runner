export enum FormFactor {
	Desktop = 'Desktop',
	Mobile = 'Mobile',
}

export type Device = {
	__typename?: 'Device';
	cpu_slowdown_factor: number;
	created_at: string;
	download_throughput_kbps: number;
	form_factor: FormFactor;
	id: number;
	name: string;
	request_latency_ms: number;
	round_trip_time_ms: number;
	scale_factor: number;
	screen_height: number;
	screen_width: number;
	updated_at: string;
	upload_throughput_kbps: number;
};
