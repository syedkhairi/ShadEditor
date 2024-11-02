<script lang="ts">
	import { Highlighter } from 'lucide-svelte';
	import { X } from 'lucide-svelte';
	import { type Editor } from '@tiptap/core';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils.js';
	import Colorpicker from '../colorpicker.svelte';
	import * as Popover from '$lib/components/ui/popover/index.js';

	let { editor }: { editor: Editor } = $props();

	let hex = $state('#FFFF00');
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Popover.Root>
				<Popover.Trigger>
					<Button
						variant="ghost"
						size="icon"
						class={cn(editor.isActive('subscript') && 'bg-muted')}
						onclick={() => editor.chain().focus()}
					>
						<Highlighter />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="bg-popover shadow-lg *:my-2">
					<div class="flex items-center justify-between">
						<h1 class="text-xl font-bold">Link</h1>
						<Popover.Close>
							<X class="size-4 text-muted-foreground" />
						</Popover.Close>
					</div>
					<p>Pick a color for highlighter</p>
					<Colorpicker bind:hex />
				</Popover.Content>
			</Popover.Root>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Highlighter (⌘H)</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
