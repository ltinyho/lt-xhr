import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as LruCache from 'lru-cache';
interface XhrRequestConfig extends AxiosRequestConfig {
    cache?: {
        filter(AxiosResponse: AxiosResponse['data']): boolean;
    };
}
interface CustomConfig {
    baseURL?: string;
}
export declare class Xhr {
    static cache: LruCache.Cache<{}, {}>;
    constructor();
    static xhr(setting: XhrRequestConfig): Promise<any>;
    static custom(settting: CustomConfig): (set: XhrRequestConfig) => Promise<any>;
}
declare const _default: typeof Xhr.xhr;
export default _default;
