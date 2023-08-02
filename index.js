import fs from 'fs';
import { tokenize } from './tokenizer.js';
import { parse } from './parser.js';
import { getVariables } from './test/variable.js';

// const code = `
//   ari x teh 10; 
//   ari y teh 20;
// `;


const code = fs.readFileSync('./examples/assign_variable.sir', 'utf-8');

const tokens = tokenize(code);
console.log('Tokens:');
console.log(tokens);

const syntaxTree = parse(tokens);
console.log('\nSyntax Tree:');
console.log(syntaxTree);

const variables = getVariables(syntaxTree);
console.log('\nVariables:');
console.log(variables);