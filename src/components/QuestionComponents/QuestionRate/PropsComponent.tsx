import { FC, useEffect } from 'react'
import { Form, Input, InputNumber, Checkbox, Select } from 'antd'
import { QuestionRatePropsType } from './interface'
import { useForm } from 'antd/es/form/Form'

const PropsComponent: FC<QuestionRatePropsType> = (props: QuestionRatePropsType) => {

    const { title, rate, count, allowHalf, character, onChange, isRequired } = props
    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue({ title, rate, count, allowHalf, isRequired })
    }, [title, rate, count, character, allowHalf, isRequired])

    function handlePropsChange() {
        if (onChange == null) return
        onChange(form.getFieldsValue())
    }

    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{ title, rate, count, character, allowHalf, isRequired }}
            onValuesChange={handlePropsChange}
        >
            <Form.Item name='title' label='标题'>
                <Input />
            </Form.Item>
            <Form.Item name='character' label='模式'>
                <Select
                    options={[
                        { value: 'star', label: '打星' },
                        { value: 'score', label: '打分' }
                    ]}
                />
            </Form.Item>
            <Form.Item name='count' label='总分'>
                <InputNumber min={5} style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name='rate'
                label='默认分数'
                rules={[
                    {
                        validator: (_, rate) => {
                            const { allowHalf } = form.getFieldsValue()
                            const isDecimal = rate % 0.5 !== 0
                            if (!allowHalf && isDecimal) return Promise.reject(new Error('不允许半星'))
                            return Promise.resolve()
                        },
                    },
                ]}
            >
                <InputNumber min={0}
                    max={form.getFieldValue('count')}
                    step={form.getFieldValue('allowHalf') ? 0.5 : 1}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item name='allowHalf' valuePropName="checked">
                <Checkbox>允许半星</Checkbox>
            </Form.Item>
            <Form.Item name='isRequired' valuePropName="checked">
                <Checkbox>必填</Checkbox>
            </Form.Item>
        </Form>
    );
}

export default PropsComponent;