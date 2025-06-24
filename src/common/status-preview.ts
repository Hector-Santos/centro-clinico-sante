// Run this with: npx tsx status-preview.ts
import chalk from 'chalk';

const variants = [
  () => {
    const emoji = '📜';
    const status = chalk.bgWhite.hex('#000000').bold(' STATUS 100 ');
    const message = chalk.white.bold(' → Continue');
    return `${emoji}  ${status}${message}`;
  },
  () => {
    const emoji = '✅';
    const status = chalk.bgHex('#6fc425').hex('#000000').bold(' STATUS 200 ');
    const message = chalk.hex('#6fc425').bold(' → OK');
    return `${emoji}  ${status}${message}`;
  },
  () => {
    const emoji = '➡️ ';
    const status = chalk.bgCyan.white.bold(' STATUS 302 ');
    const message = chalk.cyanBright.bold(' → Found');
    return `${emoji}  ${status}${message}`;
  },
  () => {
    const emoji = '🫠 ';
    const status = chalk.bgHex('#FFFF00').hex('#000000').bold(' STATUS 400 ');
    const message = chalk.yellowBright.bold(' → Bad Request');
    return `${emoji}  ${status}${message}`;
  },
  () => {
    const emoji = '❌';
    const status = chalk.bgRed.white.bold(' STATUS 500 ');
    const message = chalk.redBright.bold(' → Internal Server Error');
    return `${emoji}  ${status}${message}`;
  },
];

for (const fn of variants) {
  console.log('\n' + fn());
}
