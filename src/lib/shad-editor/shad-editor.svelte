<script lang="ts">
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
	import TextAlign from '@tiptap/extension-text-align';

	import { SmilieReplacer } from './custom/Extentions/SmilieReplacer.js';
	import { ColorHighlighter } from './custom/Extentions/ColorHighlighter.js';
	import Table from '@tiptap/extension-table';
	import TableRow from '@tiptap/extension-table-row';
	import TableHeader from '@tiptap/extension-table-header';
	import TableCell from '@tiptap/extension-table-cell';
	import { ImageExtension } from './custom/Extentions/ImageExtention.js';
	import { SvelteNodeViewRenderer } from 'svelte-tiptap';
	import CodeExtended from './custom/code-extended.svelte';

	// Lowlight
	import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
	import { all, createLowlight } from 'lowlight';
	import '@catppuccin/highlightjs/css/catppuccin-mocha.css';
	import SearchAndReplace from './custom/Extentions/SearchAndReplace.js';

	const lowlight = createLowlight(all);

	interface Props {
		content: string | null | undefined;
		className?: string;
	}

	let { content = $bindable(), className } : Props = $props();

	let editor = $state<Editor | null>(null);
	let element: HTMLElement;
	let activeTools = $state({
		isBold: false,
		isItalic: false,
		isUnderline: false,
		isStrikethrough: false,
		isBlockquote: false,
		isCode: false,
		isSuperscript: false,
		isSubscript: false,
		isBulletList: false,
		isOrderedList: false,
		isTaskList: false,
	})

	$effect(() => {
		editor?.on('transaction', ({ editor }) => {
			editor.isActive('bold') ? activeTools.isBold = true : activeTools.isBold = false;
			editor.isActive('italic') ? activeTools.isItalic = true : activeTools.isItalic = false;
			editor.isActive('underline') ? activeTools.isUnderline = true : activeTools.isUnderline = false;
			editor.isActive('strike') ? activeTools.isStrikethrough = true : activeTools.isStrikethrough = false;
			editor.isActive('code') ? activeTools.isCode = true : activeTools.isCode = false;
			editor.isActive('blockquote') ? activeTools.isBlockquote = true : activeTools.isBlockquote = false;
			editor.isActive('superscript') ? activeTools.isSuperscript = true : activeTools.isSuperscript = false;
			editor.isActive('subscript') ? activeTools.isSubscript = true : activeTools.isSubscript = false;
			editor.isActive('bulletList') ? activeTools.isBulletList = true : activeTools.isBulletList = false;
			editor.isActive('orderedList') ? activeTools.isOrderedList = true : activeTools.isOrderedList = false;
			editor.isActive('taskList') ? activeTools.isTaskList = true : activeTools.isTaskList = false;
		})
	})

	onMount(() => {
		editor = new Editor({
			element,
			content: content || '',
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
					openOnClick: false,
					autolink: true,
					defaultProtocol: 'https',
					HTMLAttributes: {
						target: '_blank',
						rel: 'noopener noreferrer'
					}
				}),
				TaskList,
				TaskItem.configure({
					nested: true
				}),
				SearchAndReplace,
				CodeBlockLowlight.configure({
					lowlight
				}).extend({
					addNodeView() {
						return SvelteNodeViewRenderer(CodeExtended);
					}
				}),
				SmilieReplacer,
				ColorHighlighter,
				Table.configure({
					allowTableNodeSelection: true,
					resizable: true
				}),
				TableRow,
				TableHeader,
				TableCell,
				ImageExtension
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

<div class={cn('flex flex-col rounded border', className)}>
	{#if editor}
		<EditorToolbar {editor} {activeTools} />
	{/if}
	<div bind:this={element} spellcheck="false" class="h-full w-full flex-1 overflow-auto"></div>
</div>
