import React, { FC } from 'react'
import { Form, Space, Checkbox } from 'antd'

interface FormComponentProps {

}

const FormComponent: FC<FormComponentProps> = (props: any) => {
    const { isVertical, options, fe_id, title, isRequired } = props
    const defaultValues = options.filter((o: any) => o.checked === true).map((o: any) => o)

    return (
        <Form.Item name={fe_id} label={title} rules={[{ required: isRequired, message: '请输入必填项' }]}>
            <Checkbox.Group defaultValue={defaultValues}>
                <Space direction={isVertical ? 'vertical' : 'horizontal'} wrap>
                    {options.map((opt: any) => {
                        return <Checkbox value={opt.value} key={opt.value}>{opt.label}</Checkbox>
                    })}
                </Space>
            </Checkbox.Group>
        </Form.Item>
    );
}

export default FormComponent;