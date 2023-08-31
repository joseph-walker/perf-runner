<script>
	import '../app.css';
	import { page } from '$app/stores';
</script>

<div class="hidden lg:flex lg:flex-col lg:w-72 lg:top-0 lg:bottom-0 lg:fixed lg:z-50">
	<div class="flex pb-4 px-6 bg-slate-900 flex-col gap-5 overflow-y-auto h-full">
		<div class="flex flex-shrink-0 items-center text-white font-mono text-5xl pt-8 pb-4">
			<a href="/">Perf Runner</a>
		</div>
		<nav class="flex flex-col flex-1">
			<ul role="list" class="flex flex-col flex-1">
				<li>
					<a
						href="/"
						class={`font-bold p-3 rounded-lg flex gap-3 ${
							$page.url.pathname === '/'
								? 'text-white bg-slate-700'
								: 'text-slate-300'
						}`}
					>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="shrink-0 w-6 h-6">
							<path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
						</svg>

						Runs
					</a>
				</li>
				<li>
					<a
						href="/devices"
						class={`font-bold p-3 rounded-lg flex gap-3 ${
							$page.url.pathname === '/devices'
								? 'text-white bg-slate-700'
								: 'text-slate-300'
						}`}
					>
						<svg
							class="shrink-0 w-6 h-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
							/>
						</svg>
						Devices
					</a>
				</li>
				<li>
					<a
						href="/targets"
						class={`font-bold p-3 rounded-lg flex gap-3  ${
							$page.url.pathname === '/targets'
								? 'text-white bg-slate-700'
								: 'text-slate-300'
						}`}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
							class="shrink-0 w-6 h-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
							/>
						</svg>
						Targets
					</a>
				</li>

				<li class="mt-auto text-slate-600 text-center" aria-hidden="true">
					Some useless cheeky statement.
				</li>
			</ul>
		</nav>
	</div>
</div>

<main class="lg:pl-72 py-12">
	<div class="px-12">
		<slot />
	</div>
</main>
