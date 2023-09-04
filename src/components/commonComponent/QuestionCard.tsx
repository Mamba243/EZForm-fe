import React, { FC } from 'react'
import { Space } from 'antd'
import styles from './QuestionCard.module.scss'
import { useNavigate, useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'


interface QuestionCardProps {
    id: string
    title: string
    startTime: string
    endTime: string
    isJoin: number
    submitAgain: number
}

const QuestionCard: FC<QuestionCardProps> = (props: QuestionCardProps) => {
    const { id, title, startTime, endTime, isJoin, submitAgain } = props
    let status = '进行中';
    const nav = useNavigate()
    const [searchParams] = useSearchParams()

    const current = dayjs()
    const start = dayjs(startTime)
    const end = dayjs(endTime)

    if (current.isBefore(start)) {
        status = '未开始'
    } else if (current.isAfter(end)) {
        status = '已结束'
    }

    function handleSheetSwitch() {
        const keyword = searchParams.get('keyword') || ''
        searchParams.set('keyword', keyword)

        // 通过localStorage存储status
        localStorage.setItem('status', submitAgain.toString());
        localStorage.setItem('isJoin', isJoin.toString());

        nav({
            pathname: `/client/${id}`,
            search: searchParams.toString()
        })
    }

    return (
        <div className={styles.container} onClick={handleSheetSwitch}>
            <div className={styles.title}>
                <div className={styles.left}>
                    <span>{title}</span>
                </div>
                <div className={styles.right}>
                    {/* TODO：根据时间去判断是否过期 */}
                    <span>{status}</span>
                </div>
            </div>
            <div className={styles['card-body']}>
                <div className={styles.left}>
                    <Space>
                        <span>{startTime}</span>至<span>{endTime}</span>
                    </Space>
                </div>
                <div className={styles.right}>
                    {isJoin ? <span>已参与</span> : <span>未参与</span>}
                </div>
            </div>
        </div>
    );
}

export default QuestionCard;
