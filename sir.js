import fs from 'fs';
import { tokenize } from './tokenizer.js';
import { parse } from './parser.js';
import { getVariables } from './test/variable.js';

const filePath = process.argv[2];

if (!filePath) {
    process.exit(1);
}

try {
    const code = fs.readFileSync(filePath, 'utf-8');
    const tokens = tokenize(code);
    const syntaxTree = parse(tokens);
    const variables = getVariables(syntaxTree);
    console.log(variables);
} catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
}