import React, { FC, useState, useEffect } from 'react'
import styles from './FullScreen.module.scss'
import { Spin, Form, Button, Divider, message, Space, FloatButton } from 'antd'
import { FullscreenExitOutlined, SyncOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { ComponentInfoType } from '../../store/componentsReducer/index'
import { getComponentConfByType } from '../../components/QuestionComponents/index'
import useLoadClientQuestionData from '../../hooks/useLoadClientQuestionData'
import useGetSheetInfo from '../../hooks/useGetSheetInfo'
import { saveClientQuestionService } from '../../services/client'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useRequest } from 'ahooks'
import QRCode from 'qrcode.react'
import { PUB_PATH } from '../../router/index'

interface SheetProps {

}

function getComponent(componentInfo: ComponentInfoType) {
    const { type, props, fe_id } = componentInfo
    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return null

    const { FormComponent } = componentConf
    return <FormComponent {...props} fe_id={fe_id} />
}

const FullScreen: FC<SheetProps> = () => {
    const [form] = useForm()
    const { loading } = useLoadClientQuestionData()
    const { componentList = [], id, questionId } = useGetSheetInfo()
    const nav = useNavigate()
    const [searchParams] = useSearchParams()
    const status = searchParams.get('status') || ''

    const [url, setUrl] = useState('')

    useEffect(() => {
        setUrl(`${PUB_PATH}/${questionId}?status=${status}`)
    }, [questionId, status])

    console.log(url);


    const { run: submit } = useRequest(
        async (answerStatus: number) => {
            const sheetParams = {
                id,
                questionId,
                answerStatus,
                answerList: JSON.stringify(form.getFieldsValue())
            }
            await saveClientQuestionService(sheetParams)
        },
        {
            manual: true,
            onSuccess(result) {
                message.success('保存成功')
            },
        },
    )

    function handleFullScreenClick() {
        nav(-1)
    }

    if (loading) return (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Spin></Spin>
        </div>
    )

    return (
        <div className={styles.container}>
            <div className={styles.left}>
            </div>
            <div className={styles.canvas}>
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
                                {getComponent(c)}
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
                                <Form.Item>
                                    <Button type="primary" onClick={() => submit(1)}>提交</Button>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" onClick={() => submit(1)}>再次填写</Button>
                                </Form.Item>
                            </Space>
                        </div> : ''
                    }
                </Form >
                {status === '1' ?
                    <div className={styles.qrcode}>
                        <div style={{ marginBottom: '4px' }}>扫码答题</div>
                        <QRCode value={url} size={80} />
                    </div> : ''
                }
            </div>
            <div className={styles.right}>
            </div>
            <FloatButton.Group shape="square" style={{ right: 15 }}>
                <FloatButton icon={<FullscreenExitOutlined />} onClick={handleFullScreenClick} />
                <FloatButton icon={<SyncOutlined />} />
                <FloatButton.BackTop visibilityHeight={0} />
            </FloatButton.Group>
        </div >
    );
}

export default FullScreen;