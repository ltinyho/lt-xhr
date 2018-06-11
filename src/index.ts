import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as url from 'url';
import * as  qs from 'querystring';
import * as  LruCache from 'lru-cache';

interface XhrRequestConfig extends AxiosRequestConfig {
  cache?: {
    filter(AxiosResponse: AxiosResponse['data']): boolean
  }
}

interface CustomConfig {
  baseURL?: string
}

export class Xhr {
  static cache = new LruCache({});

  constructor() {
  }

  public static xhr(setting: XhrRequestConfig) {
    let cacheData: any;
    const cacheKey = url.format({
      pathname: setting.url,
      search: qs.stringify(setting.params),
    });
    if (setting.cache) {
      cacheData = this.cache.get(cacheKey);
      if (cacheData) {
        return new Promise((resolve) => {
          resolve(cacheData);
        });
      }
    }
    return axios(setting).then((res) => {
      const data = res.data;
      if (setting.cache) {
        // 通过结果判断是否缓存
        if (setting.cache.filter && typeof setting.cache.filter === 'function') {
          if (setting.cache.filter(data)) {
            this.cache.set(cacheKey, data);
          }
        } else {
          this.cache.set(cacheKey, data);
        }
      }
      return data;
    });
  }

  public static custom(settting: CustomConfig) {
    return (set: XhrRequestConfig) => {
      set.url = settting.baseURL + set.url;
      return this.xhr(set);
    };
  }
}

export default Xhr.xhr;


