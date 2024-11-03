# ShadEditor

Text editor build for svelte with tiptap and shadcn ui.

Creating tiptap editor from scratch is a pain. This package provides a ready-to-use editor with all the features you need.

## Installation

```bash
npm install shadeditor
```

## Usage

```svelte
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
```

## License

[MIT](LICENSE)
