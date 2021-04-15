"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const utils_fs_1 = require("@ionic/utils-fs");
const debug_1 = tslib_1.__importDefault(require("debug"));
const path_1 = tslib_1.__importDefault(require("path"));
const config_1 = require("./capacitor/config");
const config_2 = require("./cordova/config");
const error_1 = require("./error");
const platform_1 = require("./platform");
const debug = debug_1.default('cordova-res:project');
async function getProjectContext(directory) {
    debug('Gathering project context...');
    const capacitor = await getCapacitorProjectContext(directory);
    if (capacitor) {
        return capacitor;
    }
    const cordova = await getCordovaProjectContext(directory);
    if (cordova) {
        return cordova;
    }
    throw new error_1.InvalidProjectError(`Current directory does not look like a Cordova or Capacitor project.`);
}
exports.getProjectContext = getProjectContext;
async function getCapacitorProjectContext(directory) {
    try {
        const configPath = config_1.getConfigPath(directory);
        const pkg = await readPackageJson(path_1.default.join(directory, 'package.json'));
        const capacitorPackages = Object.keys({
            ...pkg.devDependencies,
            ...pkg.dependencies,
        })
            .map(p => {
            const m = p.match(/@capacitor\/(\w+)/);
            if (m) {
                return m[1];
            }
        })
            .filter((p) => !!p);
        const platforms = platform_1.filterSupportedPlatforms(capacitorPackages);
        return {
            type: 'capacitor',
            directory,
            pkg,
            platforms,
            config: await config_1.read(configPath),
        };
    }
    catch (e) {
        debug('Cannot load as Capacitor project: %O', e);
    }
}
exports.getCapacitorProjectContext = getCapacitorProjectContext;
async function getCordovaProjectContext(directory) {
    try {
        const configPath = config_2.getConfigPath(directory);
        const config = await config_2.read(configPath);
        const doc = config.getroot();
        const platforms = platform_1.filterSupportedPlatforms(config_2.getPlatforms(doc));
        return {
            type: 'cordova',
            directory,
            pkg: await readPackageJson(path_1.default.join(directory, 'package.json')),
            platforms,
            config,
        };
    }
    catch (e) {
        debug('Cannot load as Cordova project: %O', e);
    }
}
exports.getCordovaProjectContext = getCordovaProjectContext;
async function readPackageJson(path) {
    return utils_fs_1.readJson(path);
}
exports.readPackageJson = readPackageJson;
