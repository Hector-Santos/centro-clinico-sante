"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNestServer = createNestServer;
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
async function createNestServer(expressInstance, forceListen = false) {
    if (!expressInstance && !forceListen) {
        console.error('[ERRO GRAVE] ExpressInstance ausente e listen não forçado. Evitando execução.');
        process.exit(1);
    }
    const adapter = expressInstance
        ? new platform_express_1.ExpressAdapter(expressInstance)
        : undefined;
    console.log('[DEBUG] Usando ExpressAdapter?', !!adapter);
    const app = await core_1.NestFactory.create(app_module_1.AppModule, adapter);
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || origin === 'http://teste-back-clinica-sante') {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    (0, class_validator_1.useContainer)(app.select(app_module_1.AppModule), { fallbackOnErrors: true });
    await app.init();
    if (forceListen) {
        const port = process.env.PORT || 3333;
        console.log(`[DEBUG] Iniciando app.listen(${port})`);
        await app.listen(port);
    }
    else {
        console.log('[DEBUG] App inicializado sem listen');
    }
    return app;
}
//# sourceMappingURL=server.js.map