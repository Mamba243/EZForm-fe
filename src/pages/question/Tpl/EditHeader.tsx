import { FC, forwardRef, useRef, useImperativeHandle } from "react"
import styles from './EditHeader.module.scss'
import { Button, Space, Typography, message } from 'antd'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { LeftOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useRequest, useKeyPress } from 'ahooks'
import { addTplService } from '../../../services/template'

const { Title } = Typography

// 发布按钮
const PubButton: FC = () => {
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const nav = useNavigate()
    const { pathname } = useLocation()

    let modifiedPageInfo: any = { ...pageInfo }
    let children = JSON.stringify(componentList)

    // 取出答案数组
    const correctAnswer: any = componentList.map(c => {
        const { props, fe_id } = c
        if (props == null) return null;

        if (props.hasOwnProperty('answer')) {
            return {
                componentId: fe_id,
                answer: props.answer,
                examScore: props.examScore
            }
        } else return null;
    }).filter(item => item !== null)

    // 加入到pageInfo中
    if (correctAnswer !== null) {
        modifiedPageInfo.correctAnswer = JSON.stringify(correctAnswer)
    }

    const { loading, run: save } = useRequest(
        async () => {
            const response = await addTplService({ ...modifiedPageInfo, children });
            return response;
        },
        {
            manual: true,
            onSuccess(result: any) {
                message.success('保存成功')
                nav('/manage/template')
            },
        },
    )

    // 快捷键
    useKeyPress(['ctrl.s', 'meta.s'], (event: KeyboardEvent) => {
        event.preventDefault()
        save()
    })

    return (
        <Button type="default" onClick={save}><SaveOutlined />保存</Button>
    )
}

const EditHeader: FC = () => {
    const nav = useNavigate()
    const { title } = useGetPageInfo()
    const saveButtonRef = useRef<any>(null)

    function handleBack() {
        nav(-1)
        if (!saveButtonRef.current) return
        // 退出自动保存
        // saveButtonRef.current.save()
    }

    return (
        <div className={styles.header}>
            <div className={styles.left}>
                <Space>
                    <Button type="link" onClick={handleBack}><LeftOutlined />返回</Button>
                    <Title level={5} style={{ marginBottom: 0 }}>{title}</Title>
                </Space>
            </div>
            <div className={styles.middle}>
                <Space size={'large'}>
                    {/* <Button type="default" shape="circle"><FundViewOutlined /></Button>
                    <Button type="default" shape="circle"><FundViewOutlined /></Button>
                    <Button type="default" shape="circle"><FundViewOutlined /></Button>
                    <Button type="default" shape="circle"><FundViewOutlined /></Button>
                    <Button type="default" shape="circle"><FundViewOutlined /></Button> */}
                </Space>
            </div>
            <div className={styles.right}>
                <Space>
                    <PubButton />
                </Space>
            </div>
        </div>
    );
}

export default EditHeader;
