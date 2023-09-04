import { FC, useEffect } from "react";
import { Input, Form, Select, Checkbox } from 'antd'
import { QuestionTitlePropsType } from './interface'


const PropsComponent: FC<QuestionTitlePropsType> = (props: QuestionTitlePropsType) => {
    const { level, title, isCenter, onChange } = props
    const [form] = Form.useForm()

    useEffect(() => {
        form.setFieldsValue({ level, title, isCenter })
    }, [level, title, isCenter])

    const handlePropsChange = () => {
        if (onChange)
            onChange(form.getFieldsValue());
    }
    return (
        <Form
            layout="vertical"
            initialValues={{ level, title, isCenter }}
            onValuesChange={handlePropsChange}
            form={form}
        >
            <Form.Item label='层级' name='level' rules={[{ required: true, message: '请选择成绩' }]}>
                <Select
                    options={[
                        { value: 1, label: '1' },
                        { value: 2, label: '2' },
                        { value: 3, label: '3' },
                        { value: 4, label: '4' },
                        { value: 5, label: '5' }
                    ]}>
                </Select>
            </Form.Item>
            <Form.Item label='内容' name='title' rules={[{ required: true, message: '请输入标题内容' }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='isCenter' rules={[{ required: true, message: '请选择是否居中' }]} valuePropName="checked">
                <Checkbox>居中显示</Checkbox>
            </Form.Item>
        </Form>
    );
}

export default PropsComponent;