import { FC, useEffect } from "react"
import { Form, Input, Checkbox, Select, Button, Space, InputNumber } from "antd"
import { nanoid } from 'nanoid'
import { QuestionRadioPropsType, OptionType } from './interface'
import { useForm } from "antd/es/form/Form"
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'

const PropsComponent: FC<QuestionRadioPropsType> = (props: QuestionRadioPropsType) => {
    const [form] = useForm()
    const { title, isVertical, value, options, onChange, answer, examScore, isRequired } = props

    useEffect(() => {
        form.setFieldsValue({ title, isVertical, value, options, answer, examScore, isRequired })
    }, [title, isVertical, value, options, answer, examScore, isRequired])

    function handlePropsChange() {
        if (onChange == null) return
        // 触发 onChange 函数
        const newValues = form.getFieldsValue() as QuestionRadioPropsType

        if (newValues.options) {
            // 需要清除 text undefined 的选项
            newValues.options = newValues.options.filter(opt => !(opt.label == null))
        }

        const { options = [] } = newValues
        options.forEach(opt => {
            if (opt.value) return
            opt.value = nanoid(5) // 补齐 opt value
        })
        onChange(newValues)
    }

    return (
        <Form
            layout="vertical"
            initialValues={{ title, isVertical, value, options, isRequired }}
            form={form}
            onValuesChange={handlePropsChange}
        >
            <Form.Item label='标题' name='title' rules={[{ required: true, message: '请输入标题' }]}>
                <Input></Input>
            </Form.Item>
            <Form.Item label='默认选中' name='value' rules={[{ required: true, message: '请输入标题' }]}>
                <Select
                    value={value}
                    options={options}
                ></Select>
            </Form.Item>
            <Form.Item label='选项' >
                <Form.List name="options">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name }, index) => {
                                return (
                                    <Space key={key} align="baseline">
                                        {/* 当前选项 输入框 */}
                                        <Form.Item
                                            name={[name, 'label']}
                                            rules={[
                                                { required: true, message: '请输入选项文字' },
                                                {
                                                    validator: (_, label) => {
                                                        const { options = [] } = form.getFieldsValue()
                                                        let num = 0
                                                        options.forEach((opt: OptionType) => {
                                                            if (opt.label === label) num++
                                                        })
                                                        if (num === 1) return Promise.resolve()
                                                        return Promise.reject(new Error('和其他选项重复了'))
                                                    },
                                                },
                                            ]}
                                        >
                                            <Input placeholder="输入选项文字" />
                                        </Form.Item>
                                        {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                                    </Space>
                                )
                            })}
                            {/* 添加选项 */}
                            <Form.Item>
                                <Button
                                    type="link"
                                    onClick={() => add({ label: '', value: '' })}
                                    icon={<PlusOutlined />}
                                    block
                                >
                                    添加选项
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form.Item>
            <Form.Item name='isVertical' valuePropName="checked">
                <Checkbox>垂直排列</Checkbox>
            </Form.Item>
            <Form.Item label='答案' name='answer'>
                <Select
                    value={value}
                    options={options}
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