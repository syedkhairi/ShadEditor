# ShadEditor

Fork of original `ShadEditor`, however this one:
* Improved use of Svelte 5 runes
* Use of toggle instead of normal buttons, with disabled
* Toggle buttons shows active state of cursor or selected text 
* Remove files overhead and use of snippets
* `<Tooltip.Provider>` to group tooltips so they don't overlap and close after another
* Correct use of snippets in triggers for `shadcn-svelte` components to pass the props e.g. tooltips, dropdowns

A ready to use text editor build for svelte with tiptap and shadcn ui.

Creating a tiptap editor from scratch is a pain. This package provides a ready-to-use editor with all the features you need. You can install the package in your project but it will not give you flexibility. The recommended way is to use cli which installs all the dependencies for you and pastes the shadeditor component in your project.

## Pre-Requisites (Important)

Since, this project uses shadcn ui, you need to install [shadcn](https://www.shadcn-svelte.com/) in your svelte project. The editor uses [tailwind typography](https://github.com/tailwindlabs/tailwindcss-typography) plugin which is not included in shadcn. So, you need to install it manually.

#### Adding shadcn and it's components

For installation of shadcn, please follow thier official [installation guide.](https://next.shadcn-svelte.com/docs/installation)

The editor usages tooltip, dropdown menu, button, separator, input, etc. Add them in your svelte project.

```bash
# using npm
npx shadcn-svelte@next add dropdown-menu button tooltip input popover separator
# using pnpm
pnpm dlx shadcn-svelte@next add dropdown-menu button tooltip input popover separator
```

#### Adding Tailwind Typography

For installation of tailwind typography, please follow thier official [installation guide.](https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#installation)

#### Adding Lucide Icons (Optional, CLI will do it for you)

Add lucide icons in your svelte project.

```bash
# using npm
npm install lucide-svelte
# using pnpm
pnpm install lucide-svelte
```

#### Adding Mode Watcher (Optional, CLI will do it for you)

Mode watcher is used to detect the mode of the editor. Add it in your svelte project.

```bash
# using npm
npm install mode-watcher
# using pnpm
pnpm install mode-watcher
```

## Installation

Recommended way is to use cli which installs all the dependencies for you and pastes the shadeditor component in your project. This method gives you full independence and flexibility. You can further customize the editor as per your need.

```bash
# using npm
npx shadeditor init
# using pnpm
pnpm dlx shadeditor init
```

## Usage

```svelte
<script lang="ts">
	import { browser } from '$app/environment';
	import ShadEditor from '$lib/components/shad-editor/shad-editor.svelte';
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
