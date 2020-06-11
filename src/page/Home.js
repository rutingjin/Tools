import React, { useState } from 'react'
import {Table, Row, Col, Button} from 'antd';
import { emit } from '../store/ipc'
const { remote } = require('electron')

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
        "title": "整体进度",
        "dataIndex": "整体进度"
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
        "title": "题源获取进度",
        "dataIndex": "题源获取进度"
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
        "title": "排版进度",
        "dataIndex": "排版进度"
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
        "title": "运营一审进度",
        "dataIndex": "运营一审进度"
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
        "title": "运营二审进度",
        "dataIndex": "运营二审进度"
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
        "title": "教研一审进度",
        "dataIndex": "教研一审进度"
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
        "title": "驳回待教研一审量【排版】",
        "dataIndex": "驳回待教研一审量【排版】"
    },
    {
        "title": "驳回待教研一审量【教研二审】",
        "dataIndex": "驳回待教研一审量【教研二审】"
    },
    {
        "title": "教研一审驳回后未处理【排版】",
        "dataIndex": "教研一审驳回后未处理【排版】"
    },
    {
        "title": "教研二审进度",
        "dataIndex": "教研二审进度"
    },
    {
        "title": "教研二审通过量",
        "dataIndex": "教研二审通过量"
    },
    {
        "title": "待教研二审量",
        "dataIndex": "待教研二审量"
    },
    {
        "title": "驳回待教研二审量【排版】",
        "dataIndex": "驳回待教研二审量【排版】"
    },
    {
        "title": "驳回待教研二审量【教研一审】",
        "dataIndex": "驳回待教研二审量【教研一审】"
    },
    {
        "title": "教研二审驳回后未处理【排版】",
        "dataIndex": "教研二审驳回后未处理【排版】"
    },
    {
        "title": "教研二审驳回后未处理【教研一审】",
        "dataIndex": "教研二审驳回后未处理【教研一审】"
    }
];
const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: !!record.disabled
    }),
}



export default function Home() {
    const [tableData, setData] = useState([])
    const uploadFile = async () => {
        const {canceled, filePaths} = await remote.dialog.showOpenDialog({ properties: [ 'openFile' ] })
        if (!canceled) {
            emit('readFile', filePaths[0]).then(data => {
                setData(data.data.table.map((item, index) => {
                    item.key = index
                    return item
                }))
            })
        }
    }

    return (
        <section style={{ padding: '20px' }}>
            <Row style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Button onClick={ () => { uploadFile() } }>上传文件-1</Button>
                    <Button>上传文件-2</Button>
                </Col>
            </Row>
            {
                tableData.length > 0 ? (<Table
                    rowSelection={{
                        type: 'checkbox',
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={tableData}
                />) : ''
            }
        </section>

    )
}