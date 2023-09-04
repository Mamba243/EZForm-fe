import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Empty, Table, Tag, Button, Space, Modal, Spin, message } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import SearchBar from '../../components/commonComponent/SearchBar'
import PaginationBar from '../../components/commonComponent/PaginationBar'
import useLoadQuestionListData from '../../hooks/useLoadQuestionListData'
import { updateQuestionService, deleteQuestionService } from '../../services/question'
import styles from './Trash.module.scss'

const { Title } = Typography
const { confirm } = Modal

const Trash: FC = () => {
    useTitle('即刻问卷 - 回收站')

    const { data = {}, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
    const { list = [], total = 0 } = data

    // 记录选中的 id
    const [selectedIds, setSelectedIds] = useState<string[]>([])

    // 恢复
    const { run: recover } = useRequest(
        async () => {
            for await (const id of selectedIds) {
                await updateQuestionService({ isDeleted: false }, id)
            }
        },
        {
            manual: true,
            debounceWait: 500, // 防抖
            onSuccess() {
                message.success('恢复成功')
                refresh() // 手动刷新列表
                setSelectedIds([])
            },
        }
    )

    // 删除
    const { run: deleteQuestion } = useRequest(
        async () => await deleteQuestionService(selectedIds),
        {
            manual: true,
            onSuccess() {
                message.success('删除成功')
                refresh()
                setSelectedIds([])
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

    const tableColumns = [
        {
            title: '标题',
            dataIndex: 'title',
        },
        {
            title: '是否发布',
            dataIndex: 'isPublished',
            render: (isPublished: boolean) => {
                return isPublished ? <Tag color="processing">已发布</Tag> : <Tag>未发布</Tag>
            },
        },
        {
            title: '答卷',
            dataIndex: 'answerNum',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
    ]

    // 可以把 JSX 片段定义为一个变量
    const TableElem = (
        <>
            <Table
                dataSource={list}
                columns={tableColumns}
                pagination={false}
                rowKey={q => q.id}
                bordered
                rowSelection={{
                    type: 'checkbox',
                    onChange: selectedRowKeys => {
                        setSelectedIds(selectedRowKeys as string[])
                    },
                }}
            />
        </>
    )

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Title level={4} style={{ margin: 0 }}>回收站</Title>
                <div style={{ display: 'flex' }}>
                    <Space>
                        <Button type="primary" disabled={selectedIds.length === 0} onClick={recover}>
                            恢复
                        </Button>
                        <Button danger disabled={selectedIds.length === 0} onClick={del}>
                            彻底删除
                        </Button>
                        <SearchBar />
                    </Space>
                </div>
            </div>
            <div className={styles.main}>
                {loading && (
                    <div style={{ textAlign: 'center' }}>
                        <Spin />
                    </div>
                )}
                {!loading && list.length === 0 && <Empty description="暂无数据" />}
                {list.length > 0 && TableElem}
            </div>
            <div className={styles.footer}>
                <PaginationBar total={total} />
            </div>
        </div>
    )
}

export default Trash
