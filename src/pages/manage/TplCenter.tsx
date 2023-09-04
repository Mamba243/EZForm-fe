import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Button, Tag, Modal, message, Space, Tooltip, Spin, Empty } from 'antd'
import { ExclamationCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { addEmptyQuestionService } from '../../services/question'
import { useRequest } from 'ahooks'
import SearchBar from '../../components/commonComponent/SearchBar'
import PaginationBar from '../../components/commonComponent/PaginationBar'
import styles from './TplCenter.module.scss'
import { deleteTplService } from '../../services/template'
import useLoadTplListData from '../../hooks/useLoadTplListData'
import useLoadTplData from '../../hooks/useLoadTplData'
import useGetComponentInfo from "../../hooks/useGetComponentInfo"
import { getComponentConfByType } from '../../components/QuestionComponents/index'
import { ComponentInfoType } from '../../store/componentsReducer/index'

const { Title } = Typography
const { confirm } = Modal

// 预览框组件
const PreViewModal: FC<any> = (props) => {
    const { selectedID, isModalOpen, setIsModalOpen } = props
    const { loading } = useLoadTplData(selectedID)
    const { componentList = [] } = useGetComponentInfo()
    const nav = useNavigate()

    // 创建新问卷
    const { run: createQuestion } = useRequest(addEmptyQuestionService, {
        manual: true,
        onSuccess(result) {
            nav(`/question/edit/${result.id}`)
            message.success('创建成功')
        },
    })

    // 点击应用
    function handleOk() {
        createQuestion()
    }

    function getComponent(componentInfo: ComponentInfoType) {
        const { type, props } = componentInfo
        const componentConf = getComponentConfByType(type)
        if (componentConf == null) return null

        const { Component } = componentConf
        return <Component {...props} />
    }

    return (
        <Modal title="模板预览"
            open={isModalOpen}
            onOk={handleOk}
            okText='引用模板'
            onCancel={() => { setIsModalOpen(false) }}
        >
            <div className={styles.modal}>
                {componentList.map((c: any) => {
                    return (
                        <div className={styles['component-wrapper']} key={c.fe_id}>
                            <div className={styles.component}>
                                {getComponent(c)}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Modal>
    )
}

// 项目卡片
const TplCard: FC<any> = (props) => {
    const nav = useNavigate()
    const { refresh, title, type, description, setIsModalOpen, id, setSelectedID } = props

    // 点击删除
    function del() {
        confirm({
            title: '确认彻底删除该模板？',
            icon: <ExclamationCircleOutlined />,
            content: '删除以后不可以找回',
            onOk: deleteQuestion,
        })
    }

    const { run: deleteQuestion } = useRequest(
        async () => await deleteTplService(id),
        {
            manual: true,
            onSuccess() {
                message.success('删除成功')
                refresh()
            },
        }
    )

    // 点击预览
    function handlePreview() {
        setIsModalOpen(true)
        setSelectedID(id)
    }

    // 点击编辑
    function handleEdit() {
        nav(`/template/edit/${id}`)
    }

    return (
        <div className={styles.card}>
            <div className={styles.card_body}>
                {type === 0 ? <Tag color='blue'>问卷模板</Tag> : <Tag color='orange'>考试模板</Tag>}
                <div style={{
                    marginTop: '20px',
                    fontSize: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 2,
                }}>
                    <span style={{ cursor: 'pointer' }}>
                        {title}
                    </span>
                </div>
                <div style={{
                    marginTop: '6px',
                    fontSize: '14px',
                    color: '#999ba1',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: 1,
                }}>{description}</div>
            </div>
            <Space className={styles.card_footer}>
                <Tooltip title="预览">
                    <Button icon={<EyeOutlined />} onClick={handlePreview} shape='circle' />
                </Tooltip>
                <Tooltip title="编辑">
                    <Button icon={<EditOutlined />} onClick={handleEdit} shape='circle' />
                </Tooltip>
                <Tooltip title="删除">
                    <Button icon={<DeleteOutlined />} onClick={del} shape='circle' />
                </Tooltip>
            </Space>
        </div>
    )
}

const TplCenter: FC = () => {
    const nav = useNavigate()
    const [selectedID, setSelectedID] = useState('')
    const [isModalOpen, setIsModalOpen] = useState(false)

    const { loading, data = {}, refresh } = useLoadTplListData()
    const { list, total } = data

    // 添加模板
    function addTpl() {
        nav('/template/add')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title level={4} style={{ margin: 0 }}>问卷模板</Title>
                <Space>
                    <Button type='primary' onClick={addTpl}>新建</Button>
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
                    return <TplCard {...i} refresh={refresh} key={i.id} setSelectedID={setSelectedID} setIsModalOpen={setIsModalOpen} />
                })}
            </div>
            <div className={styles.footer}>
                <PaginationBar total={total} />
            </div>
            <PreViewModal selectedID={selectedID} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen} />
        </div>
    );
}

export default TplCenter;