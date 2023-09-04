import React, { FC } from 'react'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { Typography, Button, Tag, Modal, message, Dropdown, Spin, Empty, Space, Select } from 'antd'
import type { MenuProps } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import SearchBar from '../../components/commonComponent/SearchBar'
import PaginationBar from '../../components/commonComponent/PaginationBar'
import styles from './MyProject.module.scss'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, copyQuestionService } from '../../services/question'

const { Title } = Typography
const { confirm } = Modal

// 项目卡片
const ProjectCard: FC = (props: any) => {
    const nav = useNavigate()
    const { refresh, title, type, answerNum, isPublished, id } = props

    // 点击卡片标题
    function handleCardHandler() {
        isPublished ?
            nav(`/question/statistics/${id}`) :
            nav(`/question/edit/${id}`)
    }

    // 点击统计
    function handleStat() {
        nav(`/question/statistics/${id}`)
    }

    // 删除
    const { run: deleteQuestion } = useRequest(
        async () => await updateQuestionService({ isDeleted: true }, id),
        {
            manual: true,
            onSuccess() {
                message.success('删除成功')
                refresh()
            },
        }
    )

    function del() {
        confirm({
            title: '确认彻底删除该问卷？',
            icon: <ExclamationCircleOutlined />,
            content: '删除以后不可以找回',
            onOk: deleteQuestion,
        })
    }

    // 复制
    const { run: copyQuestion } = useRequest(
        async () => await copyQuestionService(id),
        {
            manual: true,
            onSuccess(result) {
                message.success('复制成功')
                nav(`/question/edit/${result.id}`)
                refresh()
            },
        }
    )

    function copy() {
        confirm({
            title: '确定要复制当前问卷吗',
            icon: <ExclamationCircleOutlined />,
            content: '您可以在复制的问卷上继续编辑',
            onOk: copyQuestion,
        })
    }

    // 点击发布
    function publish() {
        isPublished ?
            confirm({
                title: '确认暂停收集该问卷？',
                icon: <ExclamationCircleOutlined />,
                content: '暂停收集后历史收集数据仍存在',
                onOk: changePublishStatus,
            }) :
            confirm({
                title: '确认发布该问卷？',
                icon: <ExclamationCircleOutlined />,
                content: '发布问卷后用户可见',
                onOk: changePublishStatus,
            })
    }

    const { run: changePublishStatus } = useRequest(
        async () => await updateQuestionService({ isPublished: true }, id),
        {
            manual: true,
            onSuccess() {
                isPublished ?
                    message.success('已暂停') :
                    message.success('已发布')
                refresh()
            },
        }
    )

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (<Button type='link' size='small' onClick={del}>删除</Button>),
        },
        {
            key: '2',
            label: (<Button type='link' size='small' onClick={publish}>{isPublished ? '停止发布' : '发布'}</Button>),
        },
        {
            key: '3',
            label: (<Button type='link' size='small' onClick={handleStat}>统计</Button>),
        },
        {
            key: '4',
            label: (<Button type='link' size='small' onClick={copy}>复制</Button>),
        },
    ];

    return (
        <div className={styles.card}>
            <div className={styles.card_body}>
                <div className={styles.card_tag}>
                    {type === 0 ? <Tag color='blue'>问卷</Tag> : <Tag color='orange'>考试</Tag>}
                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                        <Button type='link'
                            style={{ height: '16px', fontWeight: 'bolder' }}
                        >
                            ...
                        </Button>
                    </Dropdown>
                </div>
                <div style={{ marginTop: '20px', fontSize: '20px' }}>
                    <span onClick={handleCardHandler} style={{
                        cursor: 'pointer',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                    }}>
                        {title}
                    </span>
                </div>
                <div style={{ marginTop: '6px', fontSize: '14px', color: '#999ba1', }}>收集:{answerNum}</div>
            </div>
            <div className={styles.card_footer}>
                <div>
                    {isPublished ?
                        <span className={styles.status} style={{ color: '#00bf6f' }}>
                            <span className={styles.dot} style={{ backgroundColor: '#00bf6f' }}></span>已发布
                        </span> :
                        <span className={styles.status}>
                            <span className={styles.dot}></span>未发布
                        </span>

                    }
                </div>
            </div>
        </div>
    )
}

const MyProject: FC = () => {
    const { loading, data = {}, refresh } = useLoadQuestionListData({})
    const { list=[], total } = data
    const [searchParams] = useSearchParams()
    const { pathname } = useLocation()
    const nav = useNavigate()

    function handleChange(value: string, key: string) {
        searchParams.set(key, value)
        nav({
            pathname,
            search: searchParams.toString()
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title level={4} style={{ margin: 0 }}>我的问卷</Title>
                <Space>
                    <Select
                        defaultValue="全部"
                        style={{ width: 100 }}
                        onChange={(value) => handleChange(value, 'type')}
                        options={[{ value: '', label: '全部' }, { value: 0, label: '问卷' }, { value: 1, label: '考试' }]}
                    />
                    <SearchBar />
                </Space>
            </div>
            <div className={styles.main}>
                {loading && (
                    <div style={{ textAlign: 'center', width: "100%" }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="暂无数据" />}
                {list?.map((i: any) => {
                    return <ProjectCard {...i} refresh={refresh} key={i.id} />
                })}
            </div>
            <div className={styles.footer}>
                <PaginationBar total={total} />
            </div>
        </div>
    );
}

export default MyProject;