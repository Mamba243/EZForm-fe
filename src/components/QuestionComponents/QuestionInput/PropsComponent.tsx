import { FC, useEffect } from "react";
import { Input, InputNumber, Form, Checkbox } from 'antd'
import { QuestionInputPropsType } from './interface'

const PropsComponent: FC<QuestionInputPropsType> = (props: QuestionInputPropsType) => {
    const { title, placeholder, answer, examScore, onChange, isRequired } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ title, placeholder, answer, examScore, isRequired })
    }, [title, placeholder, answer, examScore, isRequired])

    const handlePropsChange = () => {
        if (onChange)
            onChange(form.getFieldsValue());
    }
    return (
        <Form
            layout="vertical"
            initialValues={{ title, placeholder, answer, examScore, isRequired }}
            form={form}
            onValuesChange={handlePropsChange}
        >
            <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='placeholder' name='placeholder' rules={[{ required: true, message: '请输入placeholder' }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='答案' name='answer'>
                <Input></Input>
            </Form.Item>
            <Form.Item label='分值' name='examScore'>
                <InputNumber min={0}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item name='isRequired' valuePropName="checked">
                <Checkbox>必填</Checkbox>
            </Form.Item>
        </Form>
    );
}

export default PropsComponent;