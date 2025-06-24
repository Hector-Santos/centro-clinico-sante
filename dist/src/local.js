"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
const server_1 = require("./server");
const logger_1 = require("./common/middlewares/logger");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await (0, server_1.createNestServer)();
    app.useLogger(['log', 'warn', 'error']);
    const httpLogger = new logger_1.HttpLoggerMiddleware();
    app.use((req, res, next) => httpLogger.use(req, res, next));
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Local server running at http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
//# sourceMappingURL=local.js.map