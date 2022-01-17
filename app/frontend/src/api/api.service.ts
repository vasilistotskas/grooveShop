import store from '@/store';
import session from './session';

const baseUrl = '/api/v1';

export default {
  alternativeToken: null,

  getUserToken(): string | null {
    return this.alternativeToken || localStorage.getItem('TOKEN_STORAGE_KEY');
  },

  beforeRequest(): void {
    store.commit('app/setLoading', true);
  },

  afterResponse(): void {
    store.commit('app/setLoading', false);
  },

  get(endpoint: string, data?: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
    this.beforeRequest();
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: 'get',
      params: data,
      headers: {
        Authorization: 'Token ' + this.getUserToken()
      }
    }).finally(() => this.afterResponse());
  },

  post(endpoint: string, data: Record<string, unknown>): Promise<unknown> {
    this.beforeRequest();
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: 'post',
      data,
      headers: {
        Authorization: 'Token ' + this.getUserToken()
      }
    }).finally(() => this.afterResponse());
  },

  put(endpoint: string, data: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
    this.beforeRequest();
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: 'put',
      data,
      headers: {
        Authorization: 'Token ' + this.getUserToken()
      }
    }).finally(() => this.afterResponse());
  },

  patch(endpoint: string, data?: Record<string, string | number | boolean | readonly string[] | readonly number[] | readonly boolean[]>): Promise<unknown> {
    this.beforeRequest();
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: 'patch',
      data,
      headers: {
        Authorization: 'Token ' + this.getUserToken()
      }
    }).finally(() => this.afterResponse());
  },

  delete(endpoint: string): Promise<unknown> {
    this.beforeRequest();
    return session({
      url: `${baseUrl}/${endpoint}`,
      method: 'delete',
      headers: {
        Authorization: 'Token ' + this.getUserToken()
      }
    }).finally(() => this.afterResponse());
  }

};
