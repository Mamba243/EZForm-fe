import { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Button, Space, InputNumber } from 'antd'
import { nanoid } from 'nanoid'
import { QuestionCheckboxPropsType, CheckboxOptionType } from './interface'
import { useForm } from "antd/es/form/Form"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

const PropsComponent: FC<QuestionCheckboxPropsType> = (props: QuestionCheckboxPropsType) => {
    const [form] = useForm()
    const { title, isVertical, options = [], onChange, answer, examScore,isRequired } = props

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, options, answer, examScore,isRequired })
    }, [title, isVertical, options, answer, examScore,isRequired])

    function handlePropsChange() {
        if (onChange == null) return

        const newValues = form.getFieldsValue() as QuestionCheckboxPropsType

        if (newValues.options) {
            newValues.options = newValues.options.filter(opt => !(opt.label == null))
        }

        const { options = [] } = newValues
        options.forEach(option => {
            if (option.value) return
            option.value = nanoid(5)
        })

        onChange(newValues)
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ title, isVertical, options, answer, examScore,isRequired }}
            form={form}
            onValuesChange={handlePropsChange}
        >
            <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='选项' >
                <Form.List name="options">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name }, index) => {
                                return (
                                    <Space key={key} align="baseline">
                                        <Form.Item name={[name, 'checked']} valuePropName="checked">
                                            <Checkbox />
                                        </Form.Item>
                                        <Form.Item
                                            name={[name, 'label']}
                                            rules={[
                                                { required: true, message: '请输入选项文字' },
                                                {
                                                    validator: (_, label) => {
                                                        const { list = [] } = form.getFieldsValue()
                                                        let num = 0
                                                        list.forEach((opt: CheckboxOptionType) => {
                                                            if (opt.label === label) num++
                                                        })
                                                        if (num === 1) return Promise.resolve()
                                                        return Promise.reject(new Error('和其他选项重复了'))
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input placeholder="输入选项文字..." />
                                        </Form.Item>
                                        {index > 0 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                    </Space>
                                )
                            })}
                            {/* 添加选项 */}
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => add({ text: '', value: '', checked: false })}
                                    icon={<PlusOutlined />}
                                    block
                                >
                                    添加选项
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item >
            <Form.Item name='isVertical' valuePropName="checked">
                <Checkbox>垂直排列</Checkbox>
            </Form.Item>
            <Form.Item label='答案' name='answer'>
                <Checkbox.Group>
                    <Space wrap>
                        {options.map((opt: any) => {
                            return <Checkbox value={opt.value} key={opt.value}>{opt.label}</Checkbox>
                        })}
                    </Space>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item label='分值' name='examScore'>
                <InputNumber min={0}
                    style={{ width: '100%' }}
                />
            </Form.Item>
            <Form.Item name='isRequired' valuePropName="checked">
                <Checkbox>必填</Checkbox>
            </Form.Item>
        </Form >
    );
}

export default PropsComponent;