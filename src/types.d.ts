import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface XhrRequestConfig extends AxiosRequestConfig {
  cache?: boolean | {
    filter?(AxiosResponse: AxiosResponse['data']): boolean
  }

  [key: string]: any
}

export interface CustomConfig {
  baseURL?: string
}

