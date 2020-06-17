import React, { useState } from 'react'
import { Table, Button, Steps, Alert } from 'antd';
import { emit } from '../store/ipc'
import './Home.css'
import { compareDataByConfig, mergeRowByData } from '../util/compare'
import SelectColumns from "./SelectColumns";

const {remote} = require('electron')


const columns = [
    {
        "title": "学部",
        "dataIndex": "学部"
    },
    {
        "title": "学科",
        "dataIndex": "学科"
    },
    {
        "title": "项目ID",
        "dataIndex": "项目ID"
    },
    {
        "title": "项目名称",
        "dataIndex": "项目名称"
    },
    {
        "title": "排版地区",
        "dataIndex": "排版地区"
    },
    {
        "title": "入库量",
        "dataIndex": "入库量"
    },
    {
        "title": "总题量",
        "dataIndex": "总题量"
    },
    {
        "title": "废弃量",
        "dataIndex": "废弃量"
    },
    {
        "title": "百川待解答",
        "dataIndex": "百川待解答"
    },
    {
        "title": "生产前已判重题量",
        "dataIndex": "生产前已判重题量"
    },
    {
        "title": "生产前待人工判重题量",
        "dataIndex": "生产前待人工判重题量"
    },
    {
        "title": "排版提交量",
        "dataIndex": "排版提交量"
    },
    {
        "title": "待排版量",
        "dataIndex": "待排版量"
    },
    {
        "title": "驳回待排版量",
        "dataIndex": "驳回待排版量"
    },
    {
        "title": "报错题量",
        "dataIndex": "报错题量"
    },
    {
        "title": "运营一审通过量",
        "dataIndex": "运营一审通过量"
    },
    {
        "title": "待运营一审量",
        "dataIndex": "待运营一审量"
    },
    {
        "title": "驳回待运营一审量",
        "dataIndex": "驳回待运营一审量"
    },
    {
        "title": "运营二审通过量",
        "dataIndex": "运营二审通过量"
    },
    {
        "title": "待运营二审量",
        "dataIndex": "待运营二审量"
    },
    {
        "title": "驳回待运营二审量",
        "dataIndex": "驳回待运营二审量"
    },
    {
        "title": "教研一审通过量",
        "dataIndex": "教研一审通过量"
    },
    {
        "title": "待教研一审量",
        "dataIndex": "待教研一审量"
    },
    {
        "title": "教研二审通过量",
        "dataIndex": "教研二审通过量"
    },
    {
        "title": "待教研二审量",
        "dataIndex": "待教研二审量"
    },
];
const {Step} = Steps;
const steps = [
    {
        title: '第一步',
        content: '上传前一天的数据',
    },
    {
        title: '第二步',
        content: '上传今天的数据',
    },
    {
        title: '比较数据',
        content: '开始比较',
    }
]
let compare = {
    pre: [],
    next: [],
    config: []
}
let checkList = []
const queue = []


export default function Home() {
    const [tableData, setData] = useState([])
    const [mergeData, setMergeData] = useState([])
    const [selectedRowKeys, setSelectedRowKeys] = useState([])
    const [tableColumns, setTableColumns] = useState(columns)
    const [current, setCurrent] = useState(0)
    const [mergeButtonStatus, setMergeButtonStatus] = useState(true)
    const [resetButtonStatus, setResetButtonStatus] = useState(true)


    const uploadFile = async (type) => {
        const {canceled, filePaths} = await remote.dialog.showOpenDialog({properties: ['openFile']})
        if (!canceled) {
            const data = await emit('readFile', filePaths[0])
            if (type === 'pre') {
                compare.pre = data.data.table
                setCurrent(1)
            } else if (type === 'next') {
                compare.next = data.data.table
                compare.config = data.data.columns
                setCurrent(2)
            }
        }
    }

    const compareData = () => {
        const data = compareDataByConfig(compare)
        const defaultData = data.map((item, index) => {
            item.key = index
            return item
        })
        setData(defaultData)
        setMergeData(defaultData)
        setCurrent(3)
    }

    const updateColumns = list => {
        const data = columns.filter(item => list.indexOf(item.title) > -1)
        setTableColumns(data)
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys)
            checkList = selectedRows.map(item => item)
            setMergeButtonStatus(checkList.length === 0)
        },
        getCheckboxProps: record => ({
            disabled: !!record.disabled
        }),
    }

    const onMergeData = () => {
        if (checkList.length === 0) return
        const hasMergeData = mergeRowByData(checkList)
        const hasMergeTableData = mergeData.filter(item => checkList.indexOf(item) === -1)
        hasMergeTableData.unshift(hasMergeData)
        const newData = hasMergeTableData.map((item, key) => {
            item.key = 'merge'+key
            return item
        })
        // 记录之前一步的数据
        queue.push(mergeData)
        setResetButtonStatus(queue.length === 0)
        setMergeData(newData)
        setSelectedRowKeys([])
    }

    const onResetData = () => {
        if (queue.length === 0) return
        const data = queue.pop()
        setResetButtonStatus(queue.length === 0)
        setMergeData(data.map(item => item))
        setSelectedRowKeys([])
    }

    const onFilterNegative = () => {
        const hasFilterData = mergeData.filter(item => !Object.keys(item).some(key => {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                if (!Number.isNaN(item[key])) {
                    return Number(item[key]) < 0
                }
                return false
            }
            return false
        }))
        setMergeData(hasFilterData)
    }

    return (
        <section style={{padding: '20px'}}>
            {current < 3 ? (
                <div>
                    <Steps current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title}/>
                        ))}
                    </Steps>
                    <div className="steps-content">{steps[current].content}</div>
                </div>
            ) : ''}
            {current === 0 ? <Button type={"primary"} block onClick={() => {
                uploadFile('pre')
            }}>上传文件</Button> : ''}
            {current === 1 ? <Button type={"primary"} block onClick={() => {
                uploadFile('next')
            }}>上传文件</Button> : ''}
            {current === 2 ? <Button type={"primary"} block onClick={() => {
                compareData()
            }}>比较数据</Button> : ''}
            {
                current === 3 && tableData.length > 0 ? (
                    <div>
                        <SelectColumns updateConfig={updateColumns}/>
                        <Table
                            columns={tableColumns}
                            dataSource={tableData}
                            pagination={false}
                        />
                    </div>
                ) : ''
            }
            {
                current === 3 && mergeData.length > 0 ? (
                    <div className={'merge-data-user'}>
                        <div className={'tool-box'}>
                            <Button disabled={mergeButtonStatus} type="primary" danger onClick={onMergeData}>合并行</Button>
                            <Button disabled={resetButtonStatus} type="primary" danger onClick={onResetData} className={'restButton'}>还原上一步</Button>
                            <Button type="primary" danger onClick={onFilterNegative}>过滤负值</Button>
                        </div>
                        <Table
                            rowSelection={{
                                selectedRowKeys,
                                ...rowSelection
                            }}
                            columns={tableColumns}
                            dataSource={mergeData}
                            pagination={false}
                        />
                    </div>
                ) : ''
            }
        </section>

    )
}
