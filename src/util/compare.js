export function compareDataByConfig (data) {
    const CompareResult = []
    for (let i = 0, len = data.next.length; i < len; i++) {
        const next = data.next[i]
        const pre = i < data.pre.length ? data.pre[i] : {}
        const result = {}
        data.config.forEach(key => {
            switch (key) {
                case '整体进度':
                case '题源获取进度':
                case '排版进度':
                case '运营一审进度':
                case '运营二审进度':
                case '教研一审进度':
                case '教研二审进度':
                case '报错题量':
                case '驳回待教研一审量【排版】':
                case '驳回待教研一审量【教研二审】':
                case '教研一审驳回后未处理【排版】':
                case '驳回待教研二审量【教研一审】':
                case '教研二审驳回后未处理【排版】':
                case '教研二审驳回后未处理【教研一审】':
                case '驳回待运营二审量':
                case '生产前已判重题量':
                case '废弃量':
                    // 忽略处理
                    break;
                case '入库量':
                case '总题量':
                case '排版提交量':
                case '运营一审通过量':
                case '运营二审通过量':
                case '教研一审通过量':
                case '教研二审通过量':
                    result[key] = (Number.isNaN(next[key]) ? 0 : next[key]) - (Number.isNaN(pre[key]) ? 0 : pre[key])
                    // 参与比较
                    break;
                case '学部':
                case '学科':
                case '项目ID':
                case '项目名称':
                case '排版地区':
                case '百川待解答':
                case '生产前待人工判重题量':
                case '待排版量':
                case '驳回待排版量':
                case '待运营一审量':
                case '驳回待运营一审量':
                case '待运营二审量':
                case '待教研一审量':
                case '待教研二审量':
                    result[key] = next[key]
                    // 仅作展示
                    break;
                default:
                    break;

            }
        })
        CompareResult.push(result)
    }
    return CompareResult
}


export function mergeRowByData (data) {
    const result = {}
    for (let i = 0, len = data.length; i < len; i++) {
        const current = data[i]
        Object.keys(current).forEach(type => {
            if (!Object.prototype.hasOwnProperty.call(current, type)) return
            switch (type) {
                case '学部':
                case '学科':
                case '排版地区':
                    // 保留第一个的内容
                    if (i === 0) {
                        result[type] = current[type]
                    }
                    break;
                case '项目ID':
                case '项目名称':
                    // 忽略
                    break;
                case '入库量':
                case '总题量':
                case '废弃量':
                case '百川待解答':
                case '生产前已判重题量':
                case '生产前待人工判重题量':
                case '排版提交量':
                case '待排版量':
                case '驳回待排版量':
                case '报错题量':
                case '运营一审通过量':
                case '待运营一审量':
                case '驳回待运营一审量':
                case '运营二审通过量':
                case '待运营二审量':
                case '驳回待运营二审量':
                case '教研一审通过量':
                case '待教研一审量':
                case '教研二审通过量':
                case '待教研二审量':
                    // 合并
                    if (i === 0) {
                        result[type] = current[type]
                    } else {
                        result[type] = (Number.isNaN(current[type]) ? 0 : Number(current[type])) + (Number.isNaN(result[type]) ? 0 : Number(result[type]))
                    }
                    break;
                default:
                    break;

            }
        })
    }
    return result
}
