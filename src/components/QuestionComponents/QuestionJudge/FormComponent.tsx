import React, { FC } from 'react'
import { Form, Radio, Space } from 'antd'

interface FormComponentProps {

}

const FormComponent: FC<FormComponentProps> = (props: any) => {
    const { isVertical, fe_id, title, isRequired } = props
    return (
        <Form.Item label={title} name={fe_id} rules={[{ required: isRequired, message: '请输入必填项' }]}>
            <Radio.Group >
                <Space direction={isVertical ? 'vertical' : 'horizontal'} wrap>
                    <Radio value={true}>对</Radio>
                    <Radio value={false}>错</Radio>
                </Space>
            </Radio.Group>
        </Form.Item>
    );
}

export default FormComponent;