import React, { FC } from 'react'
import { Form, Radio, Space } from 'antd'
import { QuestionRadioPropsType } from './interface'

interface FormComponentProps {

}

const FormComponent: FC<FormComponentProps> = (props: any) => {
    const { isVertical, value, fe_id, title, options, isRequired } = props
    return (
        <Form.Item label={title} name={fe_id} rules={[{ required: isRequired, message: '请输入必填项' }]}>
            <Radio.Group defaultValue={value}>
                <Space direction={isVertical ? 'vertical' : 'horizontal'} wrap>
                    {options.map((opt: any) => {
                        return <Radio value={opt.value} key={opt.value}>{opt.label}</Radio>
                    })}
                </Space>
            </Radio.Group>
        </Form.Item >
    );
}

export default FormComponent;
