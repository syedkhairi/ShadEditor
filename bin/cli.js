#!/usr/bin/env node
import fs from 'fs-extra';
import path from 'path';

const [, , command] = process.argv;

async function init() {
	const targetPath = './src/lib/shad-editor';
	const sourcePath = path.join(__dirname, '../src/lib/shad-editor');

	try {
		await fs.copy(sourcePath, targetPath);
		console.log(`Components copied to ${targetPath}`);
	} catch (error) {
		console.error('Error copying components:', error);
	}
}

if (command === 'init') {
	init();
} else {
	console.log('Usage: shadeditor init');
}
