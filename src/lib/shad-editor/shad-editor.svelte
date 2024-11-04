<script lang="ts">
	let className: string = '';
	export { className as class };
	export let content: string = '';

	import './editor.css';

	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import { onDestroy, onMount } from 'svelte';
	import EditorToolbar from './editor-toolbar.svelte';
	import { cn } from '$lib/utils.js';

	import { Subscript } from '@tiptap/extension-subscript';
	import { Superscript } from '@tiptap/extension-superscript';
	import { Underline } from '@tiptap/extension-underline';
	import { Link } from '@tiptap/extension-link';
	import TaskList from '@tiptap/extension-task-list';
	import TaskItem from '@tiptap/extension-task-item';
	import TextStyle from '@tiptap/extension-text-style';
	import Color from '@tiptap/extension-color';
	import Highlight from '@tiptap/extension-highlight';
	import Text from '@tiptap/extension-text';
	import Typography from '@tiptap/extension-typography';
	import CodeBlockShiki from 'tiptap-extension-code-block-shiki';
	import TextAlign from '@tiptap/extension-text-align';

	import { SmilieReplacer } from './custom/Extentions/SmilieReplacer.js';
	import { ColorHighlighter } from './custom/Extentions/ColorHighlighter.js';
	import BubbleMenu from './bubble-menu.svelte';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableHeader from '@tiptap/extension-table-header';
	import TableCell from '@tiptap/extension-table-cell';

	let editor: Editor;
	let element: HTMLElement;

	onMount(() => {
		editor = new Editor({
			element,
			content,
			editorProps: {
				attributes: {
					class:
						'm-auto p-2 focus:outline-none flex-1 prose text-foreground min-w-full max-h-full overflow-auto dark:prose-invert *:my-2'
				}
			},
			extensions: [
				StarterKit.configure({
					orderedList: {
						HTMLAttributes: {
							class: 'list-decimal'
						}
					},
					bulletList: {
						HTMLAttributes: {
							class: 'list-disc'
						}
					},
					heading: {
						levels: [1, 2, 3, 4],
						HTMLAttributes: {
							class: 'tiptap-heading'
						}
					}
				}),
				Typography,
				Text,
				TextStyle,
				TextAlign.configure({
					types: ['heading', 'paragraph']
				}),
				Color,
				Highlight.configure({ multicolor: true }),
				Underline,
				Superscript,
				Subscript,
				Link.configure({
					HTMLAttributes: {
						target: '_blank',
						rel: 'noopener noreferrer'
					}
				}),
				TaskList,
				TaskItem.configure({
					nested: true
				}),
				CodeBlockShiki.configure({
					defaultTheme: 'one-dark-pro'
				}),
				SmilieReplacer,
				ColorHighlighter,
				Table.configure({
					allowTableNodeSelection: true,
					resizable: true
				}),
				TableRow,
				TableHeader,
				TableCell
			],
			autofocus: true,
			onTransaction: (transaction) => {
				editor = transaction.editor;
				content = editor.getHTML();
			}
		});
	});

	onDestroy(() => {
		if (editor) editor.destroy();
	});
</script>

<!-- <div class="flex flex-row items-center gap-4">
	<span>
		<input type="checkbox" bind:checked={showPopupMenu} />
		Show Popup Menu
	</span>
	<span>
		<input type="checkbox" bind:checked={showToolbar} />
		Show Toolbar
	</span>
</div> -->
<div class={cn('flex flex-col rounded border', className)}>
	{#if editor}
		<EditorToolbar {editor} />
	{/if}
	<div bind:this={element} spellcheck="false" class="h-full w-full flex-1 overflow-auto"></div>
</div>
