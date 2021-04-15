"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_fs_1 = require("@ionic/utils-fs");
const path_1 = tslib_1.__importDefault(require("path"));
function getConfigPath(directory) {
    return path_1.default.resolve(directory, 'capacitor.config.json');
}
exports.getConfigPath = getConfigPath;
async function read(path) {
    return utils_fs_1.readJson(path);
}
exports.read = read;
