import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface XhrRequestConfig extends AxiosRequestConfig {
  cache?: boolean | {
    filter?(AxiosResponse: AxiosResponse['data']): boolean
  }
}

export interface CustomConfig {
  baseURL?: string
}

