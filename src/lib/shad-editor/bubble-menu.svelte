<script lang="ts">
	import { onMount } from 'svelte';
	import { type Editor } from '@tiptap/core';
	import { BubbleMenuPlugin, type BubbleMenuPluginProps } from '@tiptap/extension-bubble-menu';

	export let editor: Editor;
	export let tippyOptions: BubbleMenuPluginProps['tippyOptions'] = {};
	export let pluginKey: BubbleMenuPluginProps['pluginKey'] = 'SvelteTiptapBubbleMenu';
	export let shouldShow: BubbleMenuPluginProps['shouldShow'] = null;
	export let updateDelay: BubbleMenuPluginProps['updateDelay'] = 250;

	let className = '';

	export { className as class };

	let element: HTMLElement;

	onMount(() => {
		const plugin = BubbleMenuPlugin({
			pluginKey,
			editor,
			element,
			tippyOptions,
			shouldShow,
			updateDelay
		});

		editor.registerPlugin(plugin);

		return () => editor.unregisterPlugin(pluginKey);
	});
</script>

<div bind:this={element} class={className} style="visibility: hidden;">
	<slot />
</div>
