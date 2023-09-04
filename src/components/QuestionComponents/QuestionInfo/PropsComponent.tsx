import { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoPropsType } from './interface'
import { useForm } from 'antd/es/form/Form'
const { TextArea } = Input

const PropsComponent: FC<QuestionInfoPropsType> = (props: QuestionInfoPropsType) => {

    const { title, desc, onChange } = props
    const [form] = useForm()

    useEffect(() => {
        form.setFieldsValue({ title, desc })
    }, [title, desc])

    function handlePropsChange() {
        if (onChange == null) return
        onChange(form.getFieldsValue())
    }

    return (
        <Form
            layout="vertical"
            form={form}
            initialValues={{ title, desc }}
            onValuesChange={handlePropsChange}
        >
            <Form.Item name='title' label='标题'>
                <Input></Input>
            </Form.Item>
            <Form.Item name='desc' label='描述'>
                <TextArea></TextArea>
            </Form.Item>
        </Form>
    );
}

export default PropsComponent;