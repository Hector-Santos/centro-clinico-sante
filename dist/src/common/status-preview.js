"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const variants = [
    () => {
        const emoji = '📜';
        const status = chalk_1.default.bgWhite.hex('#000000').bold(' STATUS 100 ');
        const message = chalk_1.default.white.bold(' → Continue');
        return `${emoji}  ${status}${message}`;
    },
    () => {
        const emoji = '✅';
        const status = chalk_1.default.bgHex('#6fc425').hex('#000000').bold(' STATUS 200 ');
        const message = chalk_1.default.hex('#6fc425').bold(' → OK');
        return `${emoji}  ${status}${message}`;
    },
    () => {
        const emoji = '➡️ ';
        const status = chalk_1.default.bgCyan.white.bold(' STATUS 302 ');
        const message = chalk_1.default.cyanBright.bold(' → Found');
        return `${emoji}  ${status}${message}`;
    },
    () => {
        const emoji = '🫠 ';
        const status = chalk_1.default.bgHex('#FFFF00').hex('#000000').bold(' STATUS 400 ');
        const message = chalk_1.default.yellowBright.bold(' → Bad Request');
        return `${emoji}  ${status}${message}`;
    },
    () => {
        const emoji = '❌';
        const status = chalk_1.default.bgRed.white.bold(' STATUS 500 ');
        const message = chalk_1.default.redBright.bold(' → Internal Server Error');
        return `${emoji}  ${status}${message}`;
    },
];
for (const fn of variants) {
    console.log('\n' + fn());
}
//# sourceMappingURL=status-preview.js.map