import * as LruCache from 'lru-cache';
import { CustomConfig, XhrRequestConfig } from './types';
export declare class Xhr {
    static cache: LruCache.Cache<{}, {}>;
    constructor();
    static xhr(setting: XhrRequestConfig): Promise<any>;
    static custom(settting: CustomConfig): (set: XhrRequestConfig) => Promise<any>;
}
declare const xhr: typeof Xhr.xhr;
export default xhr;
