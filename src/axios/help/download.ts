import { isRef, shallowRef, watch, type Ref } from 'vue';
import type { AxiosResponse } from "axios"
import { saveFileFromBlob } from "howtools";
import { HowDownLoadExRequestOptions } from 'types/axios';

declare type contentTypeStr = 'application/*' | 'application/msword' | 'application/vnd.ms-excel' | 'application/pdf' | 'application/vnd.ms-powerpoint';



/**
 * @param  {Ref<AxiosResponse<T>>|any} data 需要下载的blob数据
 * @param  {HowVesAxiosDownloadOptions} options?
 */
export function useResponseBlobDownLoad(options?: HowDownLoadExRequestOptions) {

    const finished = shallowRef(false)//下载完成标志

    const { fileName, contentType, cbdata } = options || {}

    const filenameReg = new RegExp('filename=([^;]+\\.[^\\.;]+);*')

    const download = (_response: AxiosResponse) => {
        finished.value = false

        //读取响应头
        const headers = _response.headers || {}

        //读取文件类型
        const _contentType = contentType ?? headers['content-type'] //读取文件类型
        if (!_contentType) throw new Error("contentType Cannot be empty")


        // 读取文件名称
        const dispositionRegArr = filenameReg.exec(_response.headers['content-disposition'])
        const _fileName = fileName ?? decodeURI(dispositionRegArr ? dispositionRegArr[0] : "") //读取文件类型
        if (!_fileName) throw new Error("fileName Cannot be empty")

        //下载数据
        const data = cbdata ? cbdata(_response) : _response.data
        saveFileFromBlob(data, _fileName, _contentType)
        finished.value = true
    }


    return {
        finished,
        download
    }
}