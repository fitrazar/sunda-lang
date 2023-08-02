export function evaluate(node) {
    if (node.type === 'Program') {
        return node.body.map(evaluate).join('\n');
    } else if (node.type === 'VariableDeclaration') {
        return `var ${evaluate(node.declarations[0])};`;
    } else if (node.type === 'VariableDeclarator') {
        return `${node.id.name} = ${evaluate(node.init)}`;
    } else if (node.type === 'Literal') {
        return node.value;
    } else if (node.type === 'Identifier') {
        return node.name;
    } else if (node.type === 'ExpressionStatement') {
        return evaluate(node.expression);
    } else if (node.type === 'BinaryExpression') {
        return `${evaluate(node.left)} ${node.operator} ${evaluate(node.right)}`;
    } else if (node.type === 'IfStatement') {
        const condition = evaluate(node.test);
        const consequent = evaluate(node.consequent);
        const alternate = node.alternate ? ` else ${evaluate(node.alternate)}` : '';
        return `if (${condition}) {${consequent}}${alternate}`;
    } else if (node.type === 'BlockStatement') {
        return node.body.map(evaluate).join('\n');
    } else if (node.type === 'MemberExpression') {
        const object = evaluate(node.object);
        const property = evaluate(node.property);
        return `${object}.${property}`;
    } else if (node.type === 'CallExpression') {
        const callee = evaluate(node.callee);
        const args = node.arguments.map(evaluate).join(', ');
        return `${callee}(${args})`;
    } else {
        throw new Error(`Unhandled node type: ${node.type}`);
    }
}
