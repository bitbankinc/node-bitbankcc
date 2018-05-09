import { ApiConfig } from './type';
import * as rp from 'request-promise';

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

  async get(path: string, query?: {}, headers?: {}) {
    return this.request('GET', path, query, {}, headers);
  }

  async post(path: string, body?: {}, headers?: {}) {
    return this.request('POST', path, {}, body, headers);
  }

  async request(method: string, path: string, qs?: {}, body?: {}, headers?: {}) {
    const options = {
      method: method,
      uri: this.endPoint.concat(path),
      timeout: this.timeout,
      forever: this.keepAlive,
      json: true,
    };

    if (qs && Object.keys(qs).length > 0) {
      Object.assign(options, { qs });
    }
    if (body && Object.keys(body).length > 0) {
      Object.assign(options, { body });
    }
    if (headers && Object.keys(headers).length > 0) {
      Object.assign(options, { headers });
    }

    if (this.optionsCallback) {
      await this.optionsCallback(options);
    }

    return rp(options).then((res: any) => {
      if (res.success === 1) {
        if (this.responseCallback) {
          this.responseCallback(res);
        }
        return res;
      } else {
        throw new Error(res.data.code);
      }
    });
  }
}
