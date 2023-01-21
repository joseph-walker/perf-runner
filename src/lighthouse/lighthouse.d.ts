// Lighthouse does not expose Types or maintain a @types package; but it DOES use Typescript,
// so we can hack into their internal typings to extract the types for the
// lighthouse function.

/// <reference types="lighthouse/types/global-lh" />

declare module 'lighthouse' {
	function lighthouse(
		url: string,
		options: Partial<LH.CliFlags>,
	): Promise<LH.RunnerResult>;
	export = lighthouse;
}
