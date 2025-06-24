"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = exports.auth = void 0;
const admin = require("firebase-admin");
admin.initializeApp();
exports.auth = admin.auth();
exports.db = admin.firestore();
exports.storage = admin.storage();
//# sourceMappingURL=firebase-admin.prod.js.map