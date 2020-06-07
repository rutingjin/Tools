import React, { useState } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Store } from "../store/ipc";

export default function LoginModal() {
    let LoginStatus = Store.isLogin()
    let [visible, setVisible] = useState(!LoginStatus)
    const [form] = Form.useForm();
    const layout = {
        labelCol: {
            span: 3,
        },
        wrapperCol: {
            span: 21,
        },
    };
    const tailLayout = {
        wrapperCol: {
            offset: 0,
            span: 24,
        },
    };

    const onFinish = values => {
        console.log(values)
        Store.login(values.Cookie)
    }
    const validateMessages = {
        required: "请输入 '${name}' 字段",
    }

    return (
        <Modal
            title="登录"
            centered
            visible={visible}
            keyboard={false}
            maskClosable={false}
            closable={false}
            footer={null}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
        >
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} validateMessages={validateMessages}>
                <Form.Item name="Cookie" label="口令" rules={[{required: true}]}>
                    <Input allowClear prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户Cookie" />
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}