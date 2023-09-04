import React, { FC } from 'react'
import { Form, Rate } from 'antd'
import { QuestionRatePropsType } from './interface'

interface FormComponentProps {

}

const FormComponent: FC<FormComponentProps> = (props: any) => {
    const { fe_id, count, rate, allowHalf, character, title, isRequired } = props
    return (
        <Form.Item name={fe_id} label={title} rules={[{ required: isRequired, message: '请输入必填项' }]}>
            <Rate
                defaultValue={rate}
                count={count}
                allowHalf={allowHalf}
                allowClear
                character={character === 'score' ? ({ index }: { index?: number }) => (index !== undefined ? index + 1 : '') : undefined}
            />
        </Form.Item>
    );
}

export default FormComponent;