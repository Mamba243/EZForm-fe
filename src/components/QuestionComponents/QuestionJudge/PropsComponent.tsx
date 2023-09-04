import { FC, useEffect } from "react"
import { Form, Input, Checkbox, Select, InputNumber } from "antd"
import { QuestionJudgePropsType } from './interface'
import { useForm } from "antd/es/form/Form"

const PropsComponent: FC<QuestionJudgePropsType> = (props: QuestionJudgePropsType) => {
    const [form] = useForm()
    const { title, isVertical, onChange, answer, examScore, isRequired } = props

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, answer, examScore, isRequired })
    }, [title, isVertical, answer, examScore, isRequired])

    function handlePropsChange() {
        if (onChange == null) return
        // 触发 onChange 函数
        const newValues = form.getFieldsValue() as QuestionJudgePropsType
        onChange(newValues)
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ title, isVertical, answer, examScore, isRequired }}
            form={form}
            onValuesChange={handlePropsChange}
        >
            <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item name='isVertical' valuePropName="checked">
                <Checkbox>垂直排列</Checkbox>
            </Form.Item>
            <Form.Item label='答案' name='answer'>
                <Select
                    options={[
                        { label: '对', value: true },
                        { label: '错', value: false },
                    ]}
                ></Select>
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