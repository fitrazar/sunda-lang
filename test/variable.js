export function getVariables(ast) {
    const variables = {};
    ast.body.forEach((statement) => {
        if (statement.type === 'VariableDeclaration') {
            variables[statement.identifier] = statement.init.value;
        }
    });
    return variables;
}