import { createAxios } from 'howuse/axios';
import type { HowAxiosRequestConfig, HowExRequestOptions } from 'howuse/axios';
import axiosMockAdapter from "axios-mock-adapter"
import "."

export const { useAxiosRequest, server } = createAxios({
  baseURL: "",
});

export function useDefRequest<T>(config: HowAxiosRequestConfig, options?: HowExRequestOptions) {
  return useAxiosRequest<T>(config, options)
}

// 模拟mock数据
export const mock = new axiosMockAdapter(server)