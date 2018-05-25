import * as http from 'http';
import * as https from 'https';
import axios from 'axios';
import { ApiConfig } from './type';

export interface ApiOptions {
  optionsCallback?: Function;
  responseCallback?: Function;
}

export class Api {
  readonly endPoint: string;
  readonly keepAlive: boolean;
  readonly timeout: number;
  readonly optionsCallback?: Function;
  readonly responseCallback?: Function;

  constructor(config: ApiConfig, options?: ApiOptions) {
    this.endPoint = config.endPoint;
    this.keepAlive = config.keepAlive || false;
    this.timeout = config.timeout || 3000;
    if (options) {
      this.optionsCallback = options.optionsCallback;
      this.responseCallback = options.responseCallback;
    }
  }

  async get(path: string, params?: {}, headers?: {}) {
    return this.request('GET', path, params, {}, headers);
  }

  async post(path: string, data?: {}, headers?: {}) {
    return this.request('POST', path, {}, data, headers);
  }

  async request(method: string, path: string, params?: {}, data?: {}, headers?: {}) {
    const options = {
      method: method,
      baseURL: this.endPoint,
      url: path,
      timeout: this.timeout,
      httpAgent: new http.Agent({ keepAlive: this.keepAlive }),
      httpsAgent: new https.Agent({ keepAlive: this.keepAlive }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (params && Object.keys(params).length > 0) {
      Object.assign(options, { params });
    }
    if (data && Object.keys(data).length > 0) {
      Object.assign(options, { data });
    }
    if (headers && Object.keys(headers).length > 0) {
      Object.assign(options, { headers });
    }

    if (this.optionsCallback) {
      await this.optionsCallback(options);
    }

    return axios
      .request(options)
      .then((res) => {
        if (res.data.success === 1) {
          if (this.responseCallback) {
            this.responseCallback(res.data);
          }
          return res.data;
        } else {
          throw new Error(res.data.data.code);
        }
      })
      .catch(console.log);
  }
}
