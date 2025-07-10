"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerMiddleware = LoggerMiddleware;
const chalk_1 = __importDefault(require("chalk"));
const arrowOut = chalk_1.default.redBright('📤');
const dim = chalk_1.default.gray;
const emoji = {
    header: '🧠',
    query: '🧩',
    time: '⏱️',
    date: '📅',
    status: '🧪',
    success: '✅',
    fail: '❌',
    warn: '⚠️',
    post: '🌀',
    get: '📡',
    put: '🔁',
    delete: '🔥',
    patch: '🩹',
    raw: '📄',
    object: '🔎',
    array: '📚',
};
function formatStatusBlock(statusCode, messageText) {
    const classDigit = Math.floor(statusCode / 100);
    switch (classDigit) {
        case 1:
            return (() => {
                const emoji = '📜';
                const status = chalk_1.default.bgWhite.hex('#000000').bold(' STATUS 100 ');
                const message = chalk_1.default.white.bold(' → Continue');
                return `${emoji}  ${status}${message}`;
            })();
        case 2:
            return (() => {
                const emoji = '✅';
                const status = chalk_1.default
                    .bgHex('#6fc425')
                    .hex('#000000')
                    .bold(` STATUS ${statusCode} `);
                const message = chalk_1.default.hex('#6fc425').bold(` → ${messageText}`);
                return `${emoji}  ${status}${message}`;
            })();
        case 3:
            return (() => {
                const emoji = '➡️ ';
                const status = chalk_1.default.bgCyan.white.bold(` STATUS ${statusCode} `);
                const message = chalk_1.default.cyanBright.bold(` → ${messageText}`);
                return `${emoji}  ${status}${message}`;
            })();
        case 4:
            return (() => {
                const emoji = '🫠 ';
                const status = chalk_1.default
                    .bgHex('#FFFF00')
                    .hex('#000000')
                    .bold(` STATUS ${statusCode} `);
                const message = chalk_1.default.yellowBright.bold(` → ${messageText}`);
                return `${emoji}  ${status}${message}`;
            })();
        case 5:
            return (() => {
                const emoji = '❌';
                const status = chalk_1.default.bgRed.white.bold(` STATUS ${statusCode} `);
                const message = chalk_1.default.redBright.bold(` → ${messageText}`);
                return `${emoji}  ${status}${message}`;
            })();
        default:
            return (() => {
                const emoji = '🤔';
                const status = chalk_1.default.bgGray.white.bold(` STATUS ${statusCode} `);
                const message = chalk_1.default.gray.bold(` → ${messageText}`);
                return `${emoji}  ${status}${message}`;
            })();
    }
}
function LoggerMiddleware(req, res, next) {
    const startTime = Date.now();
    const chunks = [];
    const originalSend = res.send;
    res.send = function (body) {
        if (body instanceof Buffer) {
            chunks.push(body);
        }
        else if (typeof body === 'string') {
            chunks.push(Buffer.from(body));
        }
        else if (typeof body === 'object') {
            chunks.push(Buffer.from(JSON.stringify(body)));
        }
        return originalSend.call(this, body);
    };
    res.on('finish', () => {
        const duration = Date.now() - startTime;
        const method = chalk_1.default.magentaBright.bold(req.method);
        const url = chalk_1.default.greenBright(req.originalUrl);
        const time = chalk_1.default.gray(`[${duration}ms]`);
        const emojiByMethod = {
            POST: emoji.post,
            GET: emoji.get,
            PUT: emoji.put,
            DELETE: emoji.delete,
            PATCH: emoji.patch,
        };
        const methodEmoji = emojiByMethod[req.method] || '🛠️';
        console.log(`\n${methodEmoji} ${method} ${url} → ${time}\n`);
        console.log(formatStatusBlock(res.statusCode, res.statusMessage || ''));
        if (req.query && Object.keys(req.query).length > 0) {
            console.log(`\n${emoji.query} ${dim(`Query:`)}`, chalk_1.default.white(JSON.stringify(req.query, null, 2)));
        }
        console.log(`\n${emoji.header} ${dim(`Headers:`)}`, chalk_1.default.white(JSON.stringify(req.headers, null, 2)));
        const responseRaw = Buffer.concat(chunks).toString('utf8');
        try {
            const parsed = JSON.parse(responseRaw);
            console.log(`\n${arrowOut} ${chalk_1.default.redBright('Response Body')} ${Array.isArray(parsed) ? emoji.array : emoji.object}`);
            formatJson(parsed, 2);
        }
        catch {
            if (responseRaw) {
                console.log(`\n${arrowOut} ${chalk_1.default.redBright('Raw Response')} ${emoji.raw}`);
                console.log(chalk_1.default.whiteBright(responseRaw));
            }
        }
        console.log(`${emoji.date} ${dim(`Date:`)}`, new Date().toLocaleString());
    });
    next();
}
function formatJson(obj, indent = 2, depth = 0) {
    const space = ' '.repeat(indent * (depth + 1));
    const braceSpace = ' '.repeat(indent * depth);
    if (Array.isArray(obj)) {
        console.log(`${braceSpace}[`);
        for (const item of obj) {
            formatJson(item, indent, depth + 1);
        }
        console.log(`${braceSpace}],`);
        return;
    }
    if (typeof obj === 'object' && obj !== null) {
        console.log(`${braceSpace}{`);
        for (const [key, value] of Object.entries(obj)) {
            const label = chalk_1.default.greenBright(`"${key}"`);
            if (typeof value === 'string') {
                const colored = colorByKey(key, value);
                console.log(`${space}${label}: ${colored},`);
            }
            else if (typeof value === 'number' || typeof value === 'boolean') {
                console.log(`${space}${label}: ${chalk_1.default.yellow(value)},`);
            }
            else if (value === null) {
                console.log(`${space}${label}: null,`);
            }
            else {
                process.stdout.write(`${space}${label}: `);
                formatJson(value, indent, depth + 1);
            }
        }
        console.log(`${braceSpace}},`);
    }
}
function colorByKey(key, value) {
    if (key.toLowerCase() === 'message')
        return chalk_1.default.yellowBright(`"${value}"`);
    if (key.toLowerCase() === 'code')
        return chalk_1.default.cyanBright(`"${value}"`);
    if (key.toLowerCase() === 'error')
        return chalk_1.default.redBright(`"${value}"`);
    if (key.toLowerCase().includes('id'))
        return chalk_1.default.magenta(`"${value}"`);
    return chalk_1.default.white(`"${value}"`);
}
//# sourceMappingURL=logger-middleware.js.map