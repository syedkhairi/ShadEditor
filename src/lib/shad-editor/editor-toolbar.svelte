<script lang="ts">
	import { type Editor } from '@tiptap/core';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
    import { Toggle } from "$lib/components/ui/toggle";
	import Undo from './icons/undo.svelte';
	import Redo from './icons/redo.svelte';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import Link from './icons/link.svelte';
	import Highlighter from './icons/highlighter.svelte';
	import Textcolor from './icons/textcolor.svelte';
	import Align from './icons/textalign.svelte';
	import Quickcolor from './icons/quickcolor.svelte';
	import Table from './icons/table.svelte';
	import Image from './icons/image.svelte';
	import Text from './icons/text.svelte';
	import SearchReplace from './icons/search-replace.svelte';

	import Bold from 'lucide-svelte/icons/bold';
	import Italic from 'lucide-svelte/icons/italic';
	import Underline from 'lucide-svelte/icons/underline';
	import Strikethrough from 'lucide-svelte/icons/strikethrough';
	import Code from 'lucide-svelte/icons/code';
	import Quote from 'lucide-svelte/icons/quote';
	import Superscript from 'lucide-svelte/icons/superscript';
	import Subscript from 'lucide-svelte/icons/subscript';
	import List from 'lucide-svelte/icons/list';
	import ListOrdered from 'lucide-svelte/icons/list-ordered';
	import ListTodo from 'lucide-svelte/icons/list-todo';
	

	let { editor, activeTools }: { editor: Editor, activeTools: { [key: string]: boolean } } = $props();

	let tools = $derived([
		{
			name: 'bold',
			label: 'Bold',
			icon: Bold,
			onclick: () => editor && editor?.chain().focus().toggleBold().run(),
			active: activeTools.isBold,
			disabled: () => editor && !editor.can().chain().focus().toggleBold().run()
		},
		{
			name: 'italic',
			label: 'Italic',
			icon: Italic,
			onclick: () => editor && editor?.chain().focus().toggleItalic().run(),
			active: activeTools.isItalic,
			disabled: () => editor && !editor.can().chain().focus().toggleItalic().run()
		},
		{
			name: 'underline',
			label: 'Underline',
			icon: Underline,
			onclick: () => editor && editor?.chain().focus().toggleUnderline().run(),
			active: activeTools.isUnderline,
			disabled: () => editor && !editor.can().chain().focus().toggleUnderline().run()
		},
		{
			name: 'strikethrough',
			label: 'Strikethrough',
			icon: Strikethrough,
			onclick: () => editor && editor?.chain().focus().toggleStrike().run(),
			active: activeTools.isStrikethrough,
			disabled: () => editor && !editor.can().chain().focus().toggleStrike().run()
		},
		{
			name: 'code',
			label: 'Code',
			icon: Code,
			onclick: () => editor && editor?.chain().focus().toggleCode().run(),
			active: activeTools.isCode,
			disabled: () => editor && !editor.can().chain().focus().toggleCode().run()
		},
		{
			name: 'blockquote',
			label: 'Blockquote',
			icon: Quote,
			onclick: () => editor && editor?.chain().focus().toggleBlockquote().run(),
			active: activeTools.isBlockQuote,
			disabled: () => editor && !editor.can().chain().focus().toggleBlockquote().run()
		},
		{
			name: 'superscript',
			label: 'Superscript',
			icon: Superscript,
			onclick: () => editor && editor?.chain().focus().toggleSuperscript().run(),
			active: activeTools.isSuperscript,
			disabled: () => editor && !editor.can().chain().focus().toggleSuperscript().run()
		},
		{
			name: 'subscript',
			label: 'Subscript',
			icon: Subscript,
			onclick: () => editor && editor?.chain().focus().toggleSubscript().run(),
			active: activeTools.isSubscript,
			disabled: () => editor && !editor.can().chain().focus().toggleSubscript().run()
		},
		{
			name: 'bulletList',
			label: 'Bullet List',
			icon: List,
			onclick: () => editor && editor?.chain().focus().toggleBulletList().run(),
			active: activeTools.isBulletedList,
			disabled: () => editor && !editor.can().chain().focus().toggleBulletList().run()
		},
		{
			name: 'orderedList',
			label: 'Numbered List',
			icon: ListOrdered,
			onclick: () => editor && editor?.chain().focus().toggleOrderedList().run(),
			active: activeTools.isOrderedList,
			disabled: () => editor && !editor.can().chain().focus().toggleOrderedList().run()
		},
		{
			name: 'taskList',
			label: 'Task List',
			icon: ListTodo,
			onclick: () => editor && editor?.chain().focus().toggleTaskList().run(),
			active: activeTools.isTaskList,
			disabled: () => editor && !editor.can().chain().focus().toggleTaskList().run()
		}
	])
</script>

{#snippet toggleButton({name, label, icon: Icon, onclick, active, disabled} : { name: string, label: string, icon: any, onclick: () => boolean | undefined, active: boolean, disabled: () => boolean })} 
	<Tooltip.Root delayDuration={0}>
		<Tooltip.Trigger>
			{#snippet child({props})}
				<Toggle 
					{...props}
					size="sm"
					pressed={active}
					disabled={disabled()}
					onPressedChange={onclick}
					aria-label={label}
					name={name}
				>
					<Icon size={18} />
				</Toggle>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{label}</p>
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}


<div class="flex w-full items-center overflow-auto border-b p-0.5 *:mx-1">
	<Tooltip.Provider>
		<Undo {editor} />
		<Redo {editor} />
		<Separator orientation="vertical" class="h-10" />
		{#each tools as { name, label, icon, onclick, active, disabled }}
			{@render toggleButton({name, label, icon, onclick, active, disabled})}
		{/each}
		<Align {editor} />
		<Link {editor} />
		<Image {editor} />
		<Table {editor} />
		<!-- <Textcolor {editor} />
		<Highlighter {editor} /> -->
		<Quickcolor {editor} />
		<SearchReplace {editor} />
	</Tooltip.Provider>
</div>
