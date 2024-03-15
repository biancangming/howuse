import { utils } from "xlsx"
import { readXlsx } from "./xlsx"

export function xlsxFileToJson(xlsx: File): Promise<Record<string, any>> {
    return new Promise((resolve, reject) => {
        readXlsx(xlsx).then(wb => {
            if (wb.SheetNames.length <= 0) {
                reject("表格内容为空，请检查...")
            }

            const sheetJson = {}
            for (const sheetName of wb.SheetNames) {
                const data = utils.sheet_to_json(wb.Sheets[sheetName])
                sheetJson[sheetName] = data
            }
            resolve(sheetJson)
        })
    })
}

function jsonToXlsx(json: any) {

}