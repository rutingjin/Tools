import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;
const defaultCheckedList = [
    '学部',
    '学科',
    '排版地区',
    '总题量',
    '待排版量',
    '排版提交量',
    '待运营一审量',
    '运营一审通过量',
    '待运营二审量',
    '待教研一审量',
    '教研一审通过量',
    '入库量',
];

const columns = [
    '学部',
    '学科',
    '项目ID',
    '项目名称',
    '排版地区',
    '入库量',
    '总题量',
    '废弃量',
    '百川待解答',
    '生产前已判重题量',
    '生产前待人工判重题量',
    '排版提交量',
    '待排版量',
    '驳回待排版量',
    '报错题量',
    '运营一审通过量',
    '待运营一审量',
    '驳回待运营一审量',
    '运营二审通过量',
    '待运营二审量',
    '驳回待运营二审量',
    '教研一审通过量',
    '待教研一审量',
    '教研二审通过量',
    '待教研二审量'
];

export default function SelectColumns({ updateConfig }) {
    const [checkList, setCheckList] = useState(defaultCheckedList)
    const [checkAllStatus, setCheckAllStatus] = useState(false)
    const [indeterminate, setIndeterminate] = useState(false)

    const onChange = list => {
        setCheckList(list)
        setCheckAllStatus(list.length === columns.length)
        setIndeterminate(list.length !== columns.length && list.length > 0)
        updateConfig(list)
    }
    const onChangeAll = () => {
        const status = !checkAllStatus
        setCheckList(status ? columns.map(item => item) : [])
        setCheckAllStatus(status)
        setIndeterminate(false)
        updateConfig(status ? columns.map(item => item) : [])
    }

    useEffect(() => {
        updateConfig(defaultCheckedList)
    }, [])

    return (
        <div className={'check-box-wrap'}>
            <div className="site-checkbox-all-wrapper">
                <Checkbox
                    indeterminate={indeterminate}
                    onChange={onChangeAll}
                    checked={checkAllStatus}
                >
                    全选
                </Checkbox>
            </div>
            <br />
            <CheckboxGroup
                className={'checkbox-item-list'}
                options={columns}
                value={checkList}
                onChange={onChange}
            />
        </div>
    )
}
