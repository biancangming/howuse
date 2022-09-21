import { createAxios } from 'howuse/axios';
import { HowAxiosRequestConfig, HowExRequestOptions } from 'types/axios';

export const { useAxiosRequest, server } = createAxios({
  baseURL: "",
});

export function useDefRequest(config: HowAxiosRequestConfig, options?: HowExRequestOptions) {
  return useAxiosRequest(config, options)
}