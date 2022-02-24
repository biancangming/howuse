import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios"
import { ref, shallowRef } from "vue-demi"
import { debounce } from 'howtools';
export * from "./help"

export type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse

export interface HowVesAxiosOptions {
    instanceConfig: AxiosRequestConfig,
    requestInterceptor?: RequestInterceptor
    responseInterceptor?: ResponseInterceptor
}

export interface HowVesExRequestOptions {
    immediate?: boolean,
    delay?: number,
    isDebounce: boolean
}

export function createAxios(options: HowVesAxiosOptions) {

    const { instanceConfig: config, requestInterceptor, responseInterceptor } = options

    const server = axios.create({
        ...config,
        baseURL: config.baseURL,
    });

    // 请求拦截器
    server.interceptors.request.use((config) => {
        if (!requestInterceptor) return config
        return requestInterceptor(config)
    })

    // 响应拦截器
    server.interceptors.response.use((response) => {
        if (!responseInterceptor) return response
        const orginResData = response.data
        // 设置不允许修改原始data
        const userResponse = responseInterceptor(response)
        userResponse.data = orginResData
        return userResponse
    })

    // Axios hook
    /**
     * @param  {AxiosRequestConfig} config
     * @param  {HowVesExRequestOptions} options?
     * @returns
     */
    function useAxiosRequest<T>(config: AxiosRequestConfig, options?: HowVesExRequestOptions) {
        const isLoading = shallowRef(false)
        const isFinished = shallowRef(false)
        const aborted = shallowRef(false)// 请求被中断
        const cancelToken: CancelTokenSource = axios.CancelToken.source()

        const loading = (loading: boolean) => {
            isLoading.value = loading
            isFinished.value = !loading
        }


        const abort = (message?: string) => {
            if (isFinished.value || !isLoading.value) return

            cancelToken.cancel(message)
            aborted.value = true
            isLoading.value = false
            isFinished.value = false
        }


        const response = ref<AxiosResponse<T>>() //axios响应
        const data = ref<T>() //响应数据
        const error = ref<AxiosError<T>>() // axios 错误响应
        const edata = ref<T>() // axios 错误响应数据

        // 不是节流的方式
        const preRequest = ({ params: p, data: d }: AxiosRequestConfig) => {
            const c = { ...config, params: p, data: d }
            server.request({ ...c, cancelToken: cancelToken.token })
                .then(r => {
                    response.value = r
                    data.value = r.data
                })
                .catch((e: AxiosError) => {
                    error.value = e
                    edata.value = e.response ? e.response.data : ""
                })
                .finally(() => {
                    loading(false)
                })
        }

        const request = debounce(preRequest, (options && options.delay) || 1)

        const execute = (config: Pick<AxiosRequestConfig, 'params' | 'data'> = { params: {}, data: {} }) => {
            loading(true)

            if (options && options.isDebounce) {
                request(config)
            } else {
                preRequest(config)
            }
        }

        // 立即执行
        if (options?.immediate) execute()

        return {
            response,
            data,
            error,
            edata,
            execute,
            aborted,
            abort,
            finished: isFinished,
            loading: isLoading,
        }
    }

    return {
        server,
        useAxiosRequest
    }
}

