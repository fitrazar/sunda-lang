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
            index++; // Lewati identifier
            index++; // Lewati "="
            node.init = walk(); // Recursive untuk mendapatkan nilai inisialisasi
            index++; // Lewati ";"
            return node;
        }

        if (token.type === 'keyword' && token.value === 'if') {
            index++;
            let node = {
                type: 'IfStatement',
                test: walk(), // Recursive untuk mendapatkan kondisi
            };
            index++; // Lewati "{"
            node.consequent = walk(); // Recursive untuk mendapatkan pernyataan jika benar
            index++; // Lewati "}"
            if (tokens[index] && tokens[index].type === 'keyword' && tokens[index].value === 'else') {
                index++; // Lewati "else"
                index++; // Lewati "{"
                node.alternate = walk(); // Recursive untuk mendapatkan pernyataan jika salah
                index++; // Lewati "}"
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
