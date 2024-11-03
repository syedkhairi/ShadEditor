<script lang="ts">
	import { browser } from '$app/environment';
	import ShadEditor from '$lib/shad-editor/shad-editor.svelte';
	import { writable } from 'svelte/store';

	let localStorageContent = '';

	if (browser) {
		localStorageContent = localStorage.getItem('content') || '';
	}

	const content = writable(localStorageContent);

	content.subscribe((value) => {
		console.log('Content Changed');
		if (!browser) return;
		localStorage.setItem('content', value);
	});
</script>

<main class="my-10 flex h-full w-full flex-col items-center justify-center">
	<ShadEditor class="h-[40rem]" content={$content} />
</main>
