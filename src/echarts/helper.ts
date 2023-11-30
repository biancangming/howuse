import type { EChartsOption } from "echarts"
import { isEmpty, isNumber, isString, isArray, isObject } from "howtools"

// 用于格式化echarts数值
export function valueFormatter(v: any, fractionDigits = 0) {
    if (isString(v)) {
        // 小数
        if (v.indexOf(".") > -1) {
            return parseFloat(v).toFixed(fractionDigits)
        } else {
            return parseInt(v).toFixed(fractionDigits)
        }
    }

    if (isNumber(v)) return v.toFixed(fractionDigits)

    return v
}

/**
 * @description 在一组数据当中寻找最大的小数位数, 包含数字的数组直接忽略，直对字符串类型数组进行加工
*/
export function findFractionDigits(data: any): number | undefined {
    if (!data) return

    const targetData: any[] = []

    data.forEach(item => {
        if (Array.isArray(item)) {
            targetData.push(...item)
        }

        if (isString(item) || isNumber(item)) {
            targetData.push(item)
        }

        if (isObject(item) && item['value']) {
            targetData.push(item['value'])
        }
    })

    const hasNumer = targetData.some(isNumber)

    if (hasNumer) return

    let maxDigits: number | undefined = undefined;

    for (const numStr of targetData as string[]) {
        const index = numStr.indexOf(".")
        if (!isEmpty(numStr) && index > - 1) {
            maxDigits = numStr.slice(index + 1).length
        }
    }

    return maxDigits
}

/**
 * 测试echarts option 是否存在某个属性， 并且存在值
*/
export function isExistPropInObj(obj: any, prop: string) {
    if (isObject(obj)) {
        const next = obj[prop]
        if (isEmpty(next)) return false
        return true
    }

    if (isArray(obj)) {
        for (const target of obj) {
            if (isExistPropInObj(target, prop)) {
                return true
            }
        }
        return false
    }

    return false
}

// 为echarts添加额外的一些数据修复工作
export function fixOption(option: EChartsOption) {
    // 根据后端数据修复tooltip
    const tooltip = option.tooltip;

    const isToolTipValueFormatter = isExistPropInObj(tooltip, "valueFormatter");

    (isArray(option.series) ? option.series : [option.series]).forEach(serie => {
        const digits = findFractionDigits(serie?.data || [])

        if (!isToolTipValueFormatter && digits) {
            // @ts-ignore 不存在tooltip 属性直接添加
            if (!isExistPropInObj(serie, "tooltip")) serie.tooltip = {}
            // @ts-ignore 不存在markPoint 属性直接添加
            if (!serie?.markPoint) serie.markPoint = {}
            // @ts-ignore
            if (!serie?.markPoint?.label) serie.markPoint.label = {}

            if (!isExistPropInObj(serie?.tooltip, "valueFormatter")) {

                if (digits) {
                    // @ts-ignore
                    serie.tooltip.valueFormatter = (value) => valueFormatter(value, digits)
                }
            }

            // 添加 markPoint 格式化提示
            if (isExistPropInObj(serie?.markPoint, "data") && !(serie?.markPoint?.label?.formatter)) {
                // @ts-ignore
                serie.markPoint.label.formatter = ({ value }) => valueFormatter(value, digits)
            }
        }
    })

    return option
}