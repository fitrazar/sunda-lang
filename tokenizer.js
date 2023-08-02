export function tokenize(code) {
    const keywords = ['ari', 'if', 'else']; // Kata kunci yang diinginkan

    const regex = /\s*([A-Za-z_][A-Za-z_0-9]*)|([0-9]+)|(teh)|(\S)\s*/g;
    const tokens = [];
    let match;

    while ((match = regex.exec(code)) !== null) {
        let token = match[0].trim();
        if (token) {
            if (keywords.includes(token)) {
                tokens.push({ type: 'keyword', value: token });
            } else if (!isNaN(token)) {
                tokens.push({ type: 'number', value: parseInt(token) });
            } else if (token === 'teh') {
                tokens.push({ type: 'operator', value: '=' });
            } else {
                tokens.push({ type: 'identifier', value: token });
            }
        }
    }

    return tokens;
}