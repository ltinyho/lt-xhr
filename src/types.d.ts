import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface XhrRequestConfig extends AxiosRequestConfig {
  cache?: {
    filter(AxiosResponse: AxiosResponse['data']): boolean
  }
}

export interface CustomConfig {
  baseURL?: string
}