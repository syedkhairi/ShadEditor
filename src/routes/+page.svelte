<script lang="ts">
	import { browser } from '$app/environment';
	import ShadEditor from '$lib/shad-editor/shad-editor.svelte';
	import { writable } from 'svelte/store';

	let localStorageContent = '';

	if (browser) {
		localStorageContent =
			localStorage.getItem('content') ||
			`
<h2 class="tiptap-heading">Creating a rich text editor with Tiptap, shadcn and ❤️</h2><p>This editor supports markdown out of the box. We have <strong>bold</strong>, <em>italic</em>, <s>strike</s>, <u>underline</u>, <a target="_blank" rel="noopener noreferrer" href="https://tsuzat.com">link</a>, <code>code</code>, Superscript A<sup>b</sup>, subscript A<sub>b</sub>, <mark>highlight1,</mark> <mark data-color="#d51010" style="background-color: #d51010; color: inherit">highlight2</mark>,<span style="color: rgb(78, 211, 21)">textcolor1, </span><span style="color: rgb(128, 0, 128)">textcolor2.</span></p><blockquote><p>Block Quote and Code highlight with shiki</p></blockquote><pre><code class="language-python">print("Hello World")</code></pre><ul class="list-disc"><li><p>Unordered List</p></li></ul><ol class="list-decimal"><li><p>Ordered List</p></li></ol><ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Task List</p></div></li></ul><h2 class="tiptap-heading" style="text-align: center">Align Center</h2><p>Smilipicker, type <code>:)</code> and it becoms 🙂 or 😉. Typography support e.g. type <code>!=</code> and it becomes ≠. Similarly (c) becomes ©, -&gt; becomes → and many more like 1×2, ½</p><p>We have color visualizer. #FFF, #000, #FF00FF&nbsp;can be visualized.</p><h3 class="tiptap-heading">Upcomming Features</h3><ul data-type="taskList"><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Image support</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Find and Replace Support</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Code language change and copy button</p></div></li><li data-checked="false" data-type="taskItem"><label><input type="checkbox"><span></span></label><div><p>Link Hover Preview??</p></div></li></ul><p>Tell me more….</p><p></p><h2 class="tiptap-heading">Table</h2><table style="width: 488px"><colgroup><col style="width: 155px"><col style="width: 167px"><col style="width: 166px"></colgroup><tbody><tr><th colspan="1" rowspan="1" colwidth="155"><p>Hello World</p></th><th colspan="1" rowspan="1" colwidth="167"><p>Hello World</p></th><th colspan="1" rowspan="1" colwidth="166"><p>Hello World</p></th></tr><tr><td colspan="1" rowspan="1" colwidth="155"><p>Hello World</p></td><td colspan="1" rowspan="1" colwidth="167"><p>Hello World </p></td><td colspan="1" rowspan="1" colwidth="166"><p>Hello World</p></td></tr><tr><td colspan="1" rowspan="1" colwidth="155"><p></p></td><td colspan="1" rowspan="1" colwidth="167"><p></p></td><td colspan="1" rowspan="1" colwidth="166"><p></p></td></tr></tbody></table>	
		`;
	}

	const content = writable(localStorageContent);

	content.subscribe((value) => {
		console.log('Content Changed');
		if (!browser) return;
		localStorage.setItem('content', value);
	});
</script>

<main class="my-10 flex h-full w-full flex-col items-center justify-center">
	<ShadEditor class="h-[40rem] max-h-[50rem] w-[80%]" bind:content={$content} />
</main>
