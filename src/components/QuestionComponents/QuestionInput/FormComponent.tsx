import React, { FC } from 'react'
import { Form, Input } from 'antd'

interface FormComponentProps {

}

const FormComponent: FC<FormComponentProps> = (props: any) => {
    const { placeholder, title, fe_id, isRequired } = props

    return (
        <Form.Item name={fe_id} label={title} rules={[{ required: isRequired, message: '请输入必填项' }]}>
            <Input placeholder={placeholder}></Input>
        </Form.Item>
    );
}

export default FormComponent;