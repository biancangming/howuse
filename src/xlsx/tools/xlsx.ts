import { type ParsingOptions, read, type WorkBook } from "xlsx"

export interface ReadFileOtions extends ParsingOptions {

}

export function readXlsx(xlsx: File, opts: ReadFileOtions = { type: 'binary' }): Promise<WorkBook> {
    return new Promise((resolve, reject) => {
        try {
            const fileRead = new FileReader()
            fileRead.onload = (e) => {
                const data = e.target?.result
                const workBook = read(data, opts)
                resolve(workBook)
            }
            fileRead.readAsBinaryString(xlsx)
        } catch (error) {
            reject(error)
        }

    })
}