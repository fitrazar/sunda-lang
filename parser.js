export function parse(tokens) {
    let index = 0;

    function walk() {
        let token = tokens[index];
        console.log(token);
        if (token.type === 'keyword' && token.value === 'ari') {
            index++;
            let node = {
                type: 'VariableDeclaration',
                identifier: tokens[index].value,
            };
            index++;
            index++;
            node.init = walk();
            index++;
            return node;
        }

        if (token.type === 'keyword' && token.value === 'if') {
            index++;
            let node = {
                type: 'IfStatement',
                test: walk(),
            };
            index++;
            node.consequent = walk();
            index++;
            if (tokens[index] && tokens[index].type === 'keyword' && tokens[index].value === 'else') {
                index++;
                index++; 
                node.alternate = walk();
                index++;
            }
            return node;
        }

        if (token.type === 'number') {
            index++;
            return {
                type: 'Literal',
                value: token.value,
            };
        }

        if (token.type === 'identifier') {
            index++;
            return {
                type: 'Identifier',
                name: token.value,
            };
        }

        if (token.type === 'keyword') {
            index++;
            return {
                type: 'Keyword',
                name: token.value,
            };
        }

        throw new Error('Invalid token type: ' + token.type);
    }

    const ast = {
        type: 'Program',
        body: [],
    };

    while (index < tokens.length) {
        ast.body.push(walk());
    }

    return ast;
}
