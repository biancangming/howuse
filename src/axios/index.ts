import axios from "axios"
import type { AxiosError, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from "axios"
import { ref, shallowRef, computed, unref, watchEffect } from 'vue';
import { debounce, isNumber } from 'howtools';
import { HowAxiosRequestConfig, HowAxiosOptions, HowExRequestOptions, HowDownLoadExRequestOptions } from "types/axios";
import { useResponseBlobDownLoad } from './help/download';
export * from "./help/download"


export function createAxios(options: HowAxiosOptions) {
    const { instanceConfig: config, requestInterceptor, responseInterceptor, errResponseInterceptor } = options

    const server = axios.create({
        ...config,
        baseURL: config.baseURL,
    });

    // 请求拦截器
    server.interceptors.request.use((config) => {
        const c = config as HowAxiosRequestConfig
        for (const key in c.path) {
            config.url = config.url?.replace(`{${key}}`, c.path[key])
        }
        delete c.path
        if (!requestInterceptor) return c
        return requestInterceptor(c as AxiosRequestConfig)
    })

    // 响应拦截器
    server.interceptors.response.use(
        (response) => {
            // 设置不允许修改原始data
            responseInterceptor && responseInterceptor(response)
            return response
        },
        (err: any) => {
            // 失败拦截处理
            errResponseInterceptor && errResponseInterceptor(err)
            // return err
        })

    // Axios hook
    /**
     * @param  {AxiosRequestConfig} config
     * @param  {HowExRequestOptions} options?
     * @returns
     */
    function useAxiosRequest<T>(config: HowAxiosRequestConfig, options?: HowExRequestOptions) {
        const { defaultVal = {} } = options || {}
        const isDebounce = isNumber(options?.delay) // 传入防抖函数的值，则认为开启防抖
        const delay = options?.delay ?? 1 // 防抖默认时间设置为1 

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
        const data = ref<T>(defaultVal) //响应数据
        const error = ref<AxiosError<T>>() // axios 错误响应
        const edata = ref<T>() // axios 错误响应数据

        // 不是节流的方式
        const preRequest = ({ params: p, data: d, path: pv }: HowAxiosRequestConfig) => {
            const c = { ...config, params: p, data: d, path: pv }
            server.request({ ...c, cancelToken: cancelToken.token })
                .then(r => {
                    response.value = r
                    data.value = r.data
                    loading(false)
                })
                .catch((e: AxiosError) => {
                    error.value = e
                    edata.value = e.response ? e.response.data : ""
                    loading(false)
                })
        }

        const request = debounce(preRequest, delay)

        const execute = (config: Pick<HowAxiosRequestConfig, 'params' | 'data' | 'path'> = { params: {}, data: {}, path: {} }) => {
            loading(true)

            isDebounce ? request(config) : preRequest(config)

            return new Promise(resolve => {
                const resultInterval = setInterval(() => {
                    if (isFinished.value) {
                        clearInterval(resultInterval)
                        resolve(data)
                    }
                }, 100)
            })
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

    // 流文件转化为下载函数
    function useBlobDownload<T>(config: HowAxiosRequestConfig, options?: HowDownLoadExRequestOptions) {
        const request = useAxiosRequest<T>({ ...config, responseType: 'blob' }, options)
        const { finished, download } = useResponseBlobDownLoad(options)
        // 全部下载完成标值
        const downLoadFinished = computed(() => unref(request.finished) && unref(finished))

        // 结果响应调用下载，转换blob流
        watchEffect(() => {
            if(!unref(request.finished)) return
            download(unref(request.response) as AxiosResponse)
        })

        return {
            ...request,
            downLoadFinished
        }
    }

    return {
        server,
        useAxiosRequest,
        useBlobDownload
    }
}
