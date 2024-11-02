<script lang="ts">
	import { mode } from 'mode-watcher';
	let { hex = $bindable() }: { hex: string } = $props();
	import ColorPicker from 'svelte-awesome-color-picker';
</script>

<div class:dark={$mode === 'dark'}>
	<ColorPicker
		bind:hex
		sliderDirection="vertical"
		label=""
		isTextInput={false}
		isAlpha
		--picker-indicator-size="1rem"
		--input-size="1rem"
	/>
</div>
