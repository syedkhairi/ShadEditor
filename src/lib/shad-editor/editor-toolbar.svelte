<script lang="ts">
	import { type Editor } from '@tiptap/core';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { Toggle } from "$lib/components/ui/toggle/index.js";
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { Separator } from '$lib/components/ui/separator/index.js';
	import ColorPicker from 'svelte-awesome-color-picker';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import Link from './icons/link.svelte';
	import Quickcolor from './icons/quickcolor.svelte';
	import Table from './icons/table.svelte';
	import Image from './icons/image.svelte';
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
	import Undo from 'lucide-svelte/icons/undo';
	import Redo from 'lucide-svelte/icons/redo';
	import Heading1 from 'lucide-svelte/icons/heading-1';
	import Heading2 from 'lucide-svelte/icons/heading-2';
	import Heading3 from 'lucide-svelte/icons/heading-3';
	import Pilcrow from 'lucide-svelte/icons/pilcrow';
	import FileJson from 'lucide-svelte/icons/file-json';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import Check from 'lucide-svelte/icons/check';
	import AlignCenter from 'lucide-svelte/icons/align-center';
	import AlignRight from 'lucide-svelte/icons/align-right';
	import AlignLeft from 'lucide-svelte/icons/align-left';
	import AlignJustify from 'lucide-svelte/icons/align-justify';
	import Highlighter from 'lucide-svelte/icons/highlighter';
	import Baseline from 'lucide-svelte/icons/baseline';
	
	let { editor, activeTools }: { editor: Editor, activeTools: { [key: string]: boolean | string } } = $props();

	let tools = $derived([
		{
			name: 'bold',
			label: 'Bold',
			icon: Bold,
			onclick: () => editor && editor?.chain().focus().toggleBold().run(),
			active: !!activeTools.isBold,
			disabled: () => editor && !editor.can().chain().focus().toggleBold().run()
		},
		{
			name: 'italic',
			label: 'Italic',
			icon: Italic,
			onclick: () => editor && editor?.chain().focus().toggleItalic().run(),
			active: !!activeTools.isItalic,
			disabled: () => editor && !editor.can().chain().focus().toggleItalic().run()
		},
		{
			name: 'underline',
			label: 'Underline',
			icon: Underline,
			onclick: () => editor && editor?.chain().focus().toggleUnderline().run(),
			active: !!activeTools.isUnderline,
			disabled: () => editor && !editor.can().chain().focus().toggleUnderline().run()
		},
		{
			name: 'strikethrough',
			label: 'Strikethrough',
			icon: Strikethrough,
			onclick: () => editor && editor?.chain().focus().toggleStrike().run(),
			active: !!activeTools.isStrikethrough,
			disabled: () => editor && !editor.can().chain().focus().toggleStrike().run()
		},
		{
			name: 'code',
			label: 'Code',
			icon: Code,
			onclick: () => editor && editor?.chain().focus().toggleCode().run(),
			active: !!activeTools.isCode,
			disabled: () => editor && !editor.can().chain().focus().toggleCode().run()
		},
		{
			name: 'blockquote',
			label: 'Blockquote',
			icon: Quote,
			onclick: () => editor && editor?.chain().focus().toggleBlockquote().run(),
			active: !!activeTools.isBlockQuote,
			disabled: () => editor && !editor.can().chain().focus().toggleBlockquote().run()
		},
		{
			name: 'superscript',
			label: 'Superscript',
			icon: Superscript,
			onclick: () => editor && editor?.chain().focus().toggleSuperscript().run(),
			active: !!activeTools.isSuperscript,
			disabled: () => editor && !editor.can().chain().focus().toggleSuperscript().run()
		},
		{
			name: 'subscript',
			label: 'Subscript',
			icon: Subscript,
			onclick: () => editor && editor?.chain().focus().toggleSubscript().run(),
			active: !!activeTools.isSubscript,
			disabled: () => editor && !editor.can().chain().focus().toggleSubscript().run()
		},
		{
			name: 'bulletList',
			label: 'Bullet List',
			icon: List,
			onclick: () => editor && editor?.chain().focus().toggleBulletList().run(),
			active: !!activeTools.isBulletedList,
			disabled: () => editor && !editor.can().chain().focus().toggleBulletList().run()
		},
		{
			name: 'orderedList',
			label: 'Numbered List',
			icon: ListOrdered,
			onclick: () => editor && editor?.chain().focus().toggleOrderedList().run(),
			active: !!activeTools.isOrderedList,
			disabled: () => editor && !editor.can().chain().focus().toggleOrderedList().run()
		},
		{
			name: 'taskList',
			label: 'Task List',
			icon: ListTodo,
			onclick: () => editor && editor?.chain().focus().toggleTaskList().run(),
			active: !!activeTools.isTaskList,
			disabled: () => editor && !editor.can().chain().focus().toggleTaskList().run()
		}
	])

	let UndoRedo = $derived([
		{
			name: 'undo',
			label: 'Undo',
			icon: Undo,
			onclick: () => editor && editor?.chain().focus().undo().run(),
			disabled: !activeTools.canUndo
		},
		{
			name: 'redo',
			label: 'Redo',
			icon: Redo,
			onclick: () => editor && editor?.chain().focus().redo().run(),
			disabled: !activeTools.canRedo
		}
	])

	let textStyleDropdown = $derived([
		{
			name: 'heading-1',
			label: 'Heading 1',
			icon: Heading1,
			onclick: () => editor && editor?.chain().focus().toggleHeading({ level: 1 }).run(),
			active: !!activeTools.isHeading1,
			disabled: () => editor && !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
		},
		{
			name: 'heading-2',
			label: 'Heading 2',
			icon: Heading2,
			onclick: () => editor && editor?.chain().focus().toggleHeading({ level: 2 }).run(),
			active: !!activeTools.isHeading2,
			disabled: () => editor && !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
		},
		{
			name: 'heading-3',
			label: 'Heading 3',
			icon: Heading3,
			onclick: () => editor && editor?.chain().focus().toggleHeading({ level: 3 }).run(),
			active: !!activeTools.isHeading3,
			disabled: () => editor && !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
		},
		{
			name: 'paragraph',
			label: 'Paragraph',
			icon: Pilcrow,
			onclick: () => editor && editor?.chain().focus().setParagraph().run(),
			active: !!activeTools.isParagraph,
			disabled: () => editor && !editor.can().chain().focus().setParagraph().run()
		},
		{
			name: 'code-block',
			label: 'Code Block',
			icon: FileJson,
			onclick: () => editor && editor?.chain().focus().toggleCodeBlock().run(),
			active: !!activeTools.isCodeBlock,
			disabled: () => editor && !editor.can().chain().focus().toggleCodeBlock().run()
		}
	])

	let textAlignDropdown = $derived([
		{
			name: 'align-center',
			label: 'Align Center',
			icon: AlignCenter,
			onclick: () => editor && editor?.chain().focus().setTextAlign('center').run(),
			active: !!activeTools.isAlignCenter,
			disabled: () => editor && !editor.can().chain().focus().setTextAlign('center').run()
		},
		{
			name: 'align-right',
			label: 'Align Right',
			icon: AlignRight,
			onclick: () => editor && editor?.chain().focus().setTextAlign('right').run(),
			active: !!activeTools.isAlignRight,
			disabled: () => editor && !editor.can().chain().focus().setTextAlign('right').run()
		},
		{
			name: 'align-left',
			label: 'Align Left',
			icon: AlignLeft,
			onclick: () => editor && editor?.chain().focus().setTextAlign('left').run(),
			active: !!activeTools.isAlignLeft,
			disabled: () => editor && !editor.can().chain().focus().setTextAlign('left').run()
		},
		{
			name: 'align-justify',
			label: 'Align Justify',
			icon: AlignJustify,
			onclick: () => editor && editor?.chain().focus().setTextAlign('justify').run(),
			active: !!activeTools.isAlignJustify,
			disabled: () => editor && !editor.can().chain().focus().setTextAlign('justify').run()
		}
	])

	let highlighterPopover = $derived({
		selected: activeTools.highlightColor as string,
		label: 'Highlighter',
		name: 'highlighter',
		icon: Highlighter,
		onclick: (color: string) => editor && editor?.chain().focus().setHighlight({ color }).run(),
		reset: () => editor && editor?.chain().focus().unsetHighlight().run(),
		disabled: () => editor && !editor.can().chain().focus().setHighlight().run()
	});

	let textColorPopover = $derived({
		selected: activeTools.textColor as string,
		label: 'Text Color',
		name: 'textcolor',
		icon: Baseline,
		onclick: (color: string) => editor && editor?.chain().focus().setColor(color).run(),
		reset: () => editor && editor?.chain().focus().unsetColor().run(),
		disabled: () => false
	});
</script>

{#snippet actionButton({name, label, icon: Icon, onclick, disabled} : { name: string, label: string, icon: any, onclick: () => boolean | undefined, disabled: boolean })} 
	<Tooltip.Root delayDuration={0}>
		<Tooltip.Trigger>
			{#snippet child({props})}
				<Button 
					{...props}
					variant="ghost"
					size="icon"
					disabled={disabled}
					onclick={onclick}
					aria-label={label}
					name={name}
				>
					<Icon size={18} />
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{label}</p>
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

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

{#snippet dropdown({ selected, options } : { selected: { name: string, label: string, icon: any, onclick: () => boolean | undefined, active: boolean, disabled: () => boolean } | null, options: { name: string, label: string, icon: any, onclick: () => boolean | undefined, active: boolean, disabled: () => boolean }[] })}
	<Tooltip.Root delayDuration={0}>
		<Tooltip.Trigger>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({props})}
						<Button 
							{...props}
							variant="ghost"
							size="sm"
							aria-label={selected?.label}
							name={selected?.name}
						>
							{@const Icon = selected?.icon}
							<Icon size={18} />
							<ChevronDown class="!size-3 text-muted-foreground" />
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content class="w-56">
					{#each options as { name, label, icon: Icon, onclick, active, disabled }}
						<DropdownMenu.Item
							onclick={onclick}
							disabled={disabled()}
							closeOnSelect={false}
						>
							<Icon size={18} /> {label}
							{#if active}
								<Check class="absolute right-2 !size-3 text-muted-foreground" />
							{/if}
						</DropdownMenu.Item>
					{/each}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{selected?.label}</p>
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

{#snippet popover({ selected, label, name, icon: Icon, onclick, reset, disabled } : { selected: string, label: string, name: string, icon: any, onclick: (color: string) => void, reset: () => void, disabled: () => boolean })}
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({props})}
						<Button
							{...props}
							variant="ghost"
							size="sm"
							disabled={disabled()}
						>
							<Icon />
							<ChevronDown class="!size-3 text-muted-foreground" />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="bg-popover shadow-lg *:my-2">
					<div class="flex items-center justify-between">
						<h1 class="text-[1.2rem] font-bold">Pick a highlight color</h1>
						<Popover.Close>
							<!-- <X class="size-4 text-muted-foreground" /> -->
						</Popover.Close>
					</div>
					<ColorPicker
						hex={selected}
						sliderDirection="vertical"
						isTextInput={false}
						isAlpha
						on:input={(event) => {
							if (event.detail.hex === undefined) return;
							onclick(event.detail.hex);
						}}
						isDialog={false}
						--picker-indicator-size="1rem"
						--input-size="1rem"
					/>
					<div class="flex items-center justify-end gap-2">
						<Button
							variant="outline"
							size="sm"
							class="border-destructive text-destructive hover:bg-destructive hover:text-foreground"
							onclick={reset}
							>Remove {label}
						</Button>
					</div>
				</Popover.Content>
			</Popover.Root>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>{label}</p>
		</Tooltip.Content>
	</Tooltip.Root>
{/snippet}

<div class="flex w-full items-center overflow-auto border-b p-0.5 *:mx-1">
	<Tooltip.Provider>
		{#each UndoRedo as { name, label, icon, onclick, disabled }}
			{@render actionButton({name, label, icon, onclick, disabled})}
		{/each}
		<Separator orientation="vertical" class="h-10" />

		{@const activeTextStyle = textStyleDropdown.find(item => item.active)}
		{@render dropdown({
			selected: activeTextStyle ?? null,
			options: textStyleDropdown
		})}
		
		{#each tools as { name, label, icon, onclick, active, disabled }}
			{@render toggleButton({name, label, icon, onclick, active, disabled})}
		{/each}

		{@const activeTextAlign = textAlignDropdown.find(item => item.active)}
		{@render dropdown({
			selected: activeTextAlign ?? null,
			options: textAlignDropdown
		})}

		{@render popover(highlighterPopover)}
		{@render popover(textColorPopover)}
		
		<Link {editor} />
		<Image {editor} />
		<Table {editor} />
		<Quickcolor {editor} />
		<SearchReplace {editor} />
	</Tooltip.Provider>
</div>
