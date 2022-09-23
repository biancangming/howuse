import { createAxios } from 'howuse/axios';
import { HowAxiosRequestConfig, HowExRequestOptions } from 'types/axios';

export const { useAxiosRequest, server } = createAxios({
  baseURL: "",
});

export function useDefRequest<T>(config: HowAxiosRequestConfig, options?: HowExRequestOptions) {
  return useAxiosRequest<T>(config, options)
}