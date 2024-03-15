import { createDef } from "howuse/utils/util"
import { utils, writeFile } from "xlsx"
import { readXlsx } from "./xlsx"


export interface XlsxImportOpts {
    xlsx: File,
    replaceFields?: Record<string, string>
}

export function xlsxFileToJson(opts: XlsxImportOpts): Promise<Record<string, any>> {
    const replaceFields = createDef(opts.replaceFields, {})

    return new Promise((resolve, reject) => {
        if (!opts.xlsx) {
            reject("xlsx is required")
            return
        }

        readXlsx(opts.xlsx).then(wb => {
            if (wb.SheetNames.length <= 0) {
                reject("表格内容为空，请检查...")
            }

            const sheetJson = {}
            for (const sheetName of wb.SheetNames) {
                const data = utils.sheet_to_json(wb.Sheets[sheetName]) as any[]
                // 替换Excel当中的标题
                for (const item of data) {
                    for (const [key, value] of Object.entries(item)) {
                        delete item[key]
                        item[replaceFields[key] || key] = value
                    }
                }

                sheetJson[sheetName] = data
            }
            resolve(sheetJson)
        }).catch(reject)
    })
}


// fieldOrder 排序之后的key顺序
export interface XlsxExportOpts {
    sheet: { sheetName: string, data: any }[]
    fileName?: string,
    replaceFields?: Record<string, string>
}

export function jsonToXlsxFile(xlsxData: XlsxExportOpts) {
    const fileName = createDef(xlsxData.fileName, "demo.xlsx")
    const replaceFields = createDef(xlsxData.replaceFields, {})
    // 创建工作簿
    const wb = utils.book_new();

    for (const { sheetName, data } of xlsxData.sheet) {
        // 替换表格当中的标题
        for (const item of data) {
            for (const [key, value] of Object.entries(item)) {
                delete item[key]
                item[replaceFields[key] || key] = value
            }
        }
        const sheet = utils.json_to_sheet(data);
        // 将工作表放入工作簿中
        utils.book_append_sheet(wb, sheet, sheetName);
        // 生成文件并下载
    }
    writeFile(wb, fileName);
}