import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios"
import { ref, shallowRef } from "vue-demi"
import { debounce } from 'howtools';

export type RequestInterceptor = (config: AxiosRequestConfig) => AxiosRequestConfig
export type ResponseInterceptor = (response: AxiosResponse) => AxiosResponse

export interface HowVesAxiosOptions {
    instanceConfig: AxiosRequestConfig,
    requestInterceptor: RequestInterceptor
    responseInterceptor: ResponseInterceptor
}

export interface HowVesExRequestOptions {
    immediate?: boolean
}

export function createAxios(options: HowVesAxiosOptions) {

    const { instanceConfig: config, requestInterceptor, responseInterceptor } = options

    const server = axios.create({
        ...config,
        baseURL: config.baseURL,
    });

    // 请求拦截器
    server.interceptors.request.use((config) => {
        return requestInterceptor(config)
    })

    // 响应拦截器
    server.interceptors.response.use((response) => {
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
        const aborted = ref(false)// 请求被中断
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

        const request = debounce(() => {
            server.request({ ...config, cancelToken: cancelToken.token })
                .then(r => {
                    response.value = r
                    data.value = r.data
                })
                .catch((e: AxiosError) => {
                    error.value = e
                    edata.value = e.response.data
                })
                .finally(() => {
                    loading(false)
                })
        })

        const execute = () => {
            loading(true)
            request()
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