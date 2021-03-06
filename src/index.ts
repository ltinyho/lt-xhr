import axios from 'axios';
import * as url from 'url';
import * as  qs from 'qs';
import * as  LruCache from 'lru-cache';
import { CustomConfig, XhrRequestConfig } from './types';

axios.defaults.transformRequest = [function (data) {
  if (typeof data === 'object') {
    data = qs.stringify(data, { arrayFormat: 'brackets' });
  }
  return data;
}];

export class Xhr {
  static cache = LruCache({ max: 500 });
  static axios = axios;

  constructor() {
  }

  public static xhr(setting: XhrRequestConfig) {
    let cacheData: any;
    const cacheKey = url.format({
      pathname: setting.url,
      search: qs.stringify(setting.params),
    });
    if (setting.cache) {
      cacheData = Xhr.cache.get(cacheKey);
      if (cacheData) {
        return new Promise((resolve) => {
          resolve(cacheData);
        });
      }
    }
    return Xhr.axios(setting).then((res) => {
      const data = res.data;
      if (setting.cache) {
        // 通过结果判断是否缓存
        if (typeof setting.cache === 'boolean') {
          Xhr.cache.set(cacheKey, data);
        } else if (typeof setting.cache === 'object') {
          if (setting.cache.filter && typeof setting.cache.filter === 'function') {
            if (setting.cache.filter(data)) {
              Xhr.cache.set(cacheKey, data);
            }
          }
        }
      }
      return data;
    });
  }

  public static custom(settting: CustomConfig) {
    return (set: XhrRequestConfig) => {
      if (settting.baseURL) {
        set.url = settting.baseURL + set.url;
      }
      return this.xhr(set);
    };
  }
}

const xhr = Xhr.xhr;
export default xhr;

