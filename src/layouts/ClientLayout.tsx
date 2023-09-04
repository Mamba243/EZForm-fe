import React, { FC, useState, useEffect, useRef, useMemo } from 'react'
import styles from './ClientLayout.module.scss'
import { Outlet } from 'react-router-dom'
import QuestionCard from '../components/commonComponent/QuestionCard'
import { useSearchParams } from 'react-router-dom'
import { useDebounceFn, useRequest } from 'ahooks'
import { getClientQuestionListService } from '../services/client'
import SearchBar from '../components/commonComponent/SearchBar'
import { Spin } from 'antd'

interface ClientLayoutProps {

}

const ClientLayout: FC<ClientLayoutProps> = () => {
    const [started, setStarted] = useState(false) // 是否已经开始加载（防抖，有延迟时间）
    const [list, setList] = useState([]) // 全部的列表数据，上划加载更多，累计
    const [pageIndex, setPageIndex] = useState(1)
    const [total, setTotal] = useState(2000)
    const hasMoreData = list.length < total

    const [searchParams] = useSearchParams() // url 参数，虽然没有 page pageSize ，但有 keyword
    const keyword = searchParams.get('keyword') || ''

    // keyword变化时 刷新数据
    useEffect(() => {
        setStarted(false)
        setPageIndex(1)
        setList([])
        setTotal(0)
    }, [keyword])

    // 真正加载数据
    const { run: loadData } = useRequest(
        async () => {
            const data = await getClientQuestionListService({
                pageIndex,
                pageSize: 10,
                title: keyword || undefined
            })
            return data;
        },
        {
            manual: true,
            onSuccess(result) {
                const { data: l = [], totalRows = 0 } = result
                setPageIndex(pageIndex + 1)
                setList(list.concat(l))
                setTotal(totalRows)
                setStarted(false)
            },
        }
    )

    const loadRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLDivElement>(null)

    const { run: tryLoadMore } = useDebounceFn(
        () => {
            const elem = loadRef.current
            if (elem == null || list == null) return
            const domRect = elem.getBoundingClientRect()
            if (domRect == null) return
            const { top } = domRect
            if (top <= document.body.clientHeight) {//开始进入页面
                loadData()
                setStarted(true)
            }
        },
        {
            wait: 1000,
        }
    );

    useEffect(() => {
        tryLoadMore() //初始化加载
    }, [searchParams])

    useEffect(() => {
        const container = listRef.current;

        if (hasMoreData) {
            container?.addEventListener('scroll', tryLoadMore)
        }
        return () => {
            container?.removeEventListener('scroll', tryLoadMore) // 解绑事件
        }

    }, [searchParams, hasMoreData])

    const LoadMoreElem = useMemo(() => {
        if (started) return <Spin />
        if (hasMoreData) return <div>上拉加载更多</div>
        return <div>这回真的到底了</div>
    }, [started, hasMoreData])

    return (
        <div className={styles.container}>
            <div className={styles.left} >
                <div className={styles.toolbar}>
                    <SearchBar />
                </div>
                <div className={styles.list} ref={listRef}>
                    {list.length > 0 &&
                        list.map((q: any) => {
                            const { id } = q
                            return <QuestionCard key={id} {...q}></QuestionCard>
                        })}
                    <div ref={loadRef} className={styles['load-elem']}>{LoadMoreElem}</div>
                </div>
            </div>
            <div className={styles.right}>
                <Outlet />
            </div>
        </div>
    );
}

export default ClientLayout;