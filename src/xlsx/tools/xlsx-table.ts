import { createDef } from "../../utils/util"
import { type Table2SheetOpts, utils, writeFile } from "xlsx";


export interface HowUseTable2SheetOpts extends Table2SheetOpts {
    el: any,
    fileName?: string,
}

export function tableToXlsxFile(opts: HowUseTable2SheetOpts) {
    const fileName = createDef(opts.fileName, "table.xlsx")
    const raw = createDef(opts.raw, true)

    const wb = utils.table_to_book(opts.el, {
        ...opts,
        raw,
    })
    
    writeFile(wb, fileName);
}