import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

const arrowOut = chalk.redBright('📤');
const dim = chalk.gray;

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

function formatStatusBlock(statusCode: number, messageText: string): string {
  const classDigit = Math.floor(statusCode / 100);

  switch (classDigit) {
    case 1:
      return (() => {
        const emoji = '📜';
        const status = chalk.bgWhite.hex('#000000').bold(' STATUS 100 ');
        const message = chalk.white.bold(' → Continue');
        return `${emoji}  ${status}${message}`;
      })();
    case 2:
      return (() => {
        const emoji = '✅';
        const status = chalk
          .bgHex('#6fc425')
          .hex('#000000')
          .bold(` STATUS ${statusCode} `);
        const message = chalk.hex('#6fc425').bold(` → ${messageText}`);
        return `${emoji}  ${status}${message}`;
      })();
    case 3:
      return (() => {
        const emoji = '➡️ ';
        const status = chalk.bgCyan.white.bold(` STATUS ${statusCode} `);
        const message = chalk.cyanBright.bold(` → ${messageText}`);
        return `${emoji}  ${status}${message}`;
      })();
    case 4:
      return (() => {
        const emoji = '🫠 ';
        const status = chalk
          .bgHex('#FFFF00')
          .hex('#000000')
          .bold(` STATUS ${statusCode} `);
        const message = chalk.yellowBright.bold(` → ${messageText}`);
        return `${emoji}  ${status}${message}`;
      })();
    case 5:
      return (() => {
        const emoji = '❌';
        const status = chalk.bgRed.white.bold(` STATUS ${statusCode} `);
        const message = chalk.redBright.bold(` → ${messageText}`);
        return `${emoji}  ${status}${message}`;
      })();
    default:
      return (() => {
        const emoji = '🤔';
        const status = chalk.bgGray.white.bold(` STATUS ${statusCode} `);
        const message = chalk.gray.bold(` → ${messageText}`);
        return `${emoji}  ${status}${message}`;
      })();
  }
}

export function devLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const startTime = Date.now();
  const chunks: Buffer[] = [];

  const originalSend = res.send;
  res.send = function (body: any): Response {
    if (body instanceof Buffer) {
      chunks.push(body);
    } else if (typeof body === 'string') {
      chunks.push(Buffer.from(body));
    } else if (typeof body === 'object') {
      chunks.push(Buffer.from(JSON.stringify(body)));
    }
    return originalSend.call(this, body);
  };

  res.on('finish', () => {
    const duration = Date.now() - startTime;

    const method = chalk.magentaBright.bold(req.method);
    const url = chalk.greenBright(req.originalUrl);

    const time = chalk.gray(`[${duration}ms]`);

    const emojiByMethod = {
      POST: emoji.post,
      GET: emoji.get,
      PUT: emoji.put,
      DELETE: emoji.delete,
      PATCH: emoji.patch,
    };
    const methodEmoji = emojiByMethod[req.method] || '🛠️';

    // HEADLINE
    console.log(`\n${methodEmoji} ${method} ${url} → ${time}\n`);

    // STATUS
    console.log(formatStatusBlock(res.statusCode, res.statusMessage || ''));

    // QUERY
    if (req.query && Object.keys(req.query).length > 0) {
      console.log(
        `\n${emoji.query} ${dim(`Query:`)}`,
        chalk.white(JSON.stringify(req.query, null, 2)),
      );
    }

    // HEADERS
    console.log(
      `\n${emoji.header} ${dim(`Headers:`)}`,
      chalk.white(JSON.stringify(req.headers, null, 2)),
    );

    // RESPONSE BODY
    const responseRaw = Buffer.concat(chunks).toString('utf8');
    try {
      const parsed = JSON.parse(responseRaw);
      console.log(
        `\n${arrowOut} ${chalk.redBright('Response Body')} ${Array.isArray(parsed) ? emoji.array : emoji.object}`,
      );
      formatJson(parsed, 2);
    } catch {
      if (responseRaw) {
        console.log(
          `\n${arrowOut} ${chalk.redBright('Raw Response')} ${emoji.raw}`,
        );
        console.log(chalk.whiteBright(responseRaw));
      }
    }

    // FOOTER
    console.log(`${emoji.date} ${dim(`Date:`)}`, new Date().toLocaleString());
  });

  next();
}

function formatJson(obj: any, indent = 2, depth = 0): void {
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
      const label = chalk.greenBright(`"${key}"`);
      if (typeof value === 'string') {
        const colored = colorByKey(key, value);
        console.log(`${space}${label}: ${colored},`);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        console.log(`${space}${label}: ${chalk.yellow(value)},`);
      } else if (value === null) {
        console.log(`${space}${label}: null,`);
      } else {
        process.stdout.write(`${space}${label}: `);
        formatJson(value, indent, depth + 1);
      }
    }
    console.log(`${braceSpace}},`);
  }
}

function colorByKey(key: string, value: string): string {
  if (key.toLowerCase() === 'message') return chalk.yellowBright(`"${value}"`);
  if (key.toLowerCase() === 'code') return chalk.cyanBright(`"${value}"`);
  if (key.toLowerCase() === 'error') return chalk.redBright(`"${value}"`);
  if (key.toLowerCase().includes('id')) return chalk.magenta(`"${value}"`);
  return chalk.white(`"${value}"`);
}
