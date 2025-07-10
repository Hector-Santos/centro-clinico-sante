"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const common_1 = require("@nestjs/common");
const ErrorReference = __importStar(require("../references/error-reference"));
const ValidationErrorIndex = {};
Object.values(ErrorReference).forEach((error) => {
    const key = `${error.dto}.${error.field}.${error.validator.toLowerCase()}`;
    ValidationErrorIndex[key] = { code: error.code, message: error.message };
});
let CustomValidationPipe = class CustomValidationPipe {
    async transform(value, { metatype }) {
        if (!metatype || !this.toValidate(metatype))
            return value;
        const object = (0, class_transformer_1.plainToInstance)(metatype, value);
        const errors = await (0, class_validator_1.validate)(object, {
            whitelist: true,
            forbidNonWhitelisted: true,
            stopAtFirstError: false,
        });
        if (errors.length === 0)
            return value;
        const formattedErrors = [];
        for (const error of errors) {
            const field = error.property;
            const constraints = error.constraints || {};
            for (const validator of Object.keys(constraints)) {
                const key = `${metatype.name}.${field}.${validator.toLowerCase()}`;
                formattedErrors.push(ValidationErrorIndex[key] ?? {
                    code: 'UNMAPPED_VALIDATION_ERROR',
                    message: constraints[validator],
                });
            }
        }
        throw new common_1.BadRequestException(formattedErrors);
    }
    toValidate(metatype) {
        return ![String, Boolean, Number, Array, Object].includes(metatype);
    }
};
exports.CustomValidationPipe = CustomValidationPipe;
exports.CustomValidationPipe = CustomValidationPipe = __decorate([
    (0, common_1.Injectable)()
], CustomValidationPipe);
//# sourceMappingURL=validation-error.pipe.js.map