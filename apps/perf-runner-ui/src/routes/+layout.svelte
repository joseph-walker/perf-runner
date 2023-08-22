<div class="layout">
	<header>
		<div>
			<div class="icon">
				🪷
<!--				🍃-->
			</div>
			Perf Runner
		</div>

		<nav>
			<a href="/">Home</a>
			<a href="/devices">Devices</a>
			<a href="/targets">Targets</a>
		</nav>
	</header>


	<main>
		<div class="page">
			<slot />
		</div>
	</main>
</div>

<style>
	.icon {
      font-size: 100px;
	}
</style>
