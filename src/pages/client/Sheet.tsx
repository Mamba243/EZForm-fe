import React, { FC, useState, useEffect } from 'react'
import styles from './Sheet.module.scss'
import { Spin, Form, Button, Divider, message, Space, FloatButton } from 'antd'
import { FullscreenOutlined, SyncOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { ComponentInfoType } from '../../store/componentsReducer/index'
import { getComponentConfByType } from '../../components/QuestionComponents/index'
import useLoadClientQuestionData from '../../hooks/useLoadClientQuestionData'
import useGetSheetInfo from '../../hooks/useGetSheetInfo'
import { saveClientQuestionService } from '../../services/client'
import { useNavigate } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { toArrayFormat } from '../../utils/AnswerListAdaptor'

interface SheetProps {

}

function getComponent(componentInfo: ComponentInfoType, initData: any) {
    const { type, props, fe_id } = componentInfo
    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return null

    const { FormComponent } = componentConf
    return <FormComponent {...props} fe_id={fe_id} initData={initData} />
}

const Sheet: FC<SheetProps> = () => {
    const [form] = useForm()
    const [ansStatus, setAnsStatus] = useState(0)
    const { loading } = useLoadClientQuestionData()
    const { componentList = [], answerRewrite = {}, id, questionId } = useGetSheetInfo()
    const status = localStorage.getItem('status') || ''
    const isJoin = localStorage.getItem('isJoin') || ''

    const nav = useNavigate()

    // 通过useEffect回填数据,Form的initialValues会有异步问题所以要用useEffect
    useEffect(() => {
        form.setFieldsValue(answerRewrite);
    }, [answerRewrite, form]);

    const { run: submit } = useRequest(
        async (answerStatus: number) => {
            await form.validateFields(); //表单校验
            const sheetParams = {
                id,
                questionId,
                answerStatus,
                answerList: JSON.stringify(toArrayFormat(form.getFieldsValue(), componentList))
            }
            setAnsStatus(answerStatus)
            await saveClientQuestionService(sheetParams)
        }, 
        {
            manual: true,
            onSuccess(result) {
                if (ansStatus === 1) {
                    message.success('提交成功')
                    localStorage.setItem('status', '0');
                    nav(`/client/result/${questionId}`)
                } else {
                    message.success('保存成功')
                }
            },
        },
    )

    function handleFullScreenClick() {
        nav(`/fullscreen/${questionId}?status=${status}`)
    }

    if (loading) return (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin></Spin>
        </div>
    )

    return (
        <div className={styles.container}>
            <Form
                form={form}
                layout='vertical'
                onValuesChange={() => form.setFieldsValue(form.getFieldsValue())}
            >
                {componentList.map((c: any, index: number) => {
                    return (
                        <div key={c.fe_id} style={{ padding: '5px' }}
                            className={`${status === '0' ? styles.block : ''}`}
                        >
                            {getComponent(c, answerRewrite)}
                        </div>
                    )
                })}
                {status === '1' ?
                    <div style={{ textAlign: 'center' }}>
                        <Divider />
                        <Space>
                            <Form.Item>
                                <Button type="default" onClick={() => submit(0)}>保存</Button>
                            </Form.Item>
                            {isJoin === '0' ?
                                <Form.Item>
                                    <Button type="primary" onClick={() => submit(1)}>提交</Button>
                                </Form.Item> :
                                <Form.Item>
                                    <Button type="primary" onClick={() => submit(1)}>再次填写</Button>
                                </Form.Item>
                            }
                        </Space>
                    </div> : ''
                }
            </Form >
            <FloatButton.Group shape="square" style={{ right: 15 }}>
                <FloatButton icon={<FullscreenOutlined />} onClick={handleFullScreenClick} />
                <FloatButton icon={<SyncOutlined />} />
                <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
        </div >
    );
}

export default Sheet;