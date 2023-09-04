import { FC, forwardRef, useRef, useImperativeHandle } from "react"
import styles from './EditHeader.module.scss'
import { Button, Space, Typography, message } from 'antd'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { LeftOutlined, SaveOutlined, SendOutlined } from '@ant-design/icons'
import useGetPageInfo from '../../../hooks/useGetPageInfo'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { useRequest, useKeyPress } from 'ahooks'
import { updateQuestionService } from '../../../services/question'
import produce from 'immer'

const { Title } = Typography

interface EditHeaderProps {

}

// 保存按钮
const SaveButton = forwardRef((props, ref) => {
    const { id } = useParams()
    const { componentList = [] } = useGetComponentInfo()
    const pageInfo = useGetPageInfo()
    const nav = useNavigate()
    const { pathname } = useLocation()

    let modifiedPageInfo: any = { ...pageInfo }
    let children = JSON.stringify(componentList)

    // 暴露出save方法供其他组件调用
    useImperativeHandle(
        ref,
        () => ({ save })
    );

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
            const response = await updateQuestionService({ ...modifiedPageInfo, children }, id);
            return response;
        },
        {
            manual: true,
            onSuccess(result: any) {
                message.success('保存成功')
                const { data: id } = result
                if (pathname.includes(`/${id}`)) return //如果已经有id了就不用再拼接了
                nav({
                    pathname: pathname + `/${id}`
                })
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
})

// 发布按钮
const PubButton: FC = () => {
    const nav = useNavigate()
    const { id = '' } = useParams()
    const { run: publish } = useRequest(
        async () => await updateQuestionService({ isPublished: true }, id),
        {
            manual: true,
            onSuccess() {
                message.success('发布成功')
                nav('/manage/my') // 发布成功，跳转到统计页面
            },
        }
    )

    return (
        <Button type="primary" onClick={publish}><SendOutlined />发布</Button>
    )
}

const EditHeader: FC<EditHeaderProps> = () => {
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
                    <SaveButton ref={saveButtonRef} />
                    <PubButton />
                </Space>
            </div>
        </div>
    );
}

export default EditHeader;
