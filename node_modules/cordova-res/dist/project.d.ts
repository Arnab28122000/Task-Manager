import type * as et from 'elementtree';

import type { Platform } from './platform';

export interface PackageJson {
    readonly name: string;
    readonly dependencies?: {
        [key: string]: string;
    };
    readonly devDependencies?: {
        [key: string]: string;
    };
}
export declare type ProjectType = 'cordova' | 'capacitor';
export interface CordovaProjectContext {
    readonly type: 'cordova';
    readonly directory: string;
    readonly pkg: PackageJson;
    readonly platforms: readonly Platform[];
    readonly config?: et.ElementTree;
}
export interface CapacitorProjectContext {
    readonly type: 'capacitor';
    readonly directory: string;
    readonly pkg: PackageJson;
    readonly platforms: readonly Platform[];
    readonly config?: {
        [key: string]: unknown;
    };
}
export declare type ProjectContext = CordovaProjectContext | CapacitorProjectContext;
export declare function getProjectContext(directory: string): Promise<ProjectContext>;
export declare function getCapacitorProjectContext(directory: string): Promise<CapacitorProjectContext | undefined>;
export declare function getCordovaProjectContext(directory: string): Promise<CordovaProjectContext | undefined>;
export declare function readPackageJson(path: string): Promise<PackageJson>;
