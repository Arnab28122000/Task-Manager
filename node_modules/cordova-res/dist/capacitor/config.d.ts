export declare type CordovaConfig = {
    [key: string]: unknown;
};
export declare function getConfigPath(directory: string): string;
export declare function read(path: string): Promise<CordovaConfig>;
