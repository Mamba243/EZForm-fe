import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './Home.module.scss'
import QuestionCard from '../../components/commonComponent/QuestionCard'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Input } from 'antd'
import { useDebounceFn, useRequest } from 'ahooks'
import { getQuestionListService } from '../../services/question'

interface HomeProps {

}
const questionList = [
    {
        _id: '1',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '2',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '3',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '4',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '5',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '6',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '7',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '8',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '9',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
    {
        _id: '10',
        title: '问卷1',
        isPublished: true,
        answerCount: 21,
        createdAt: '2022-02-21',
        endAt: '2022-03-21',
        state: '进行中',
        isJoin: true,
    },
]
const Home: FC<HomeProps> = () => {
    const [list, setList] = useState(questionList) // 全部的列表数据，上划加载更多，累计
    const [pageIndex, setPageIndex] = useState(1)
    const [total, setTotal] = useState(2000)
    const hasMoreData = list.length < total
    const [searchParams] = useSearchParams()

    const { run: loadData } = useRequest(
        async () => {
            const data = await getQuestionListService({
                pageIndex,
                pageSize: 10,
            })
            return data;
        },
        {
            manual: true,
            onSuccess(result) {
                const { data: l = [], totalRows = 0 } = result
                setList(list.concat(l))
                setTotal(totalRows)
                setPageIndex(pageIndex + 1)
            },
        }
    )

    const loadRef = useRef<HTMLDivElement>(null)
    const { run: tryLoadMore } = useDebounceFn(() => {
        const elem = loadRef.current
        if (elem == null || list == null) return
        const domRect = elem.getBoundingClientRect()
        if (domRect == null) return
        const { top } = domRect
        if (hasMoreData && top <= document.body.clientHeight) {//开始进入页面
            loadData();
        }
    });

    function searchHandler() {
        console.log('搜索');
    }

    useEffect(() => {
        tryLoadMore() //初始化加载
    }, [searchParams])

    useEffect(() => {
        if (hasMoreData) {
            window.addEventListener('scroll', tryLoadMore)
        }
        return () => {
            window.removeEventListener('scroll', tryLoadMore) // 解绑事件
        }
    }, [searchParams])

    const LoadMoreElem: FC = () => {
        if (hasMoreData) return <div>上拉加载更多</div>
        return <div>这回真的到底了</div>
    }

    return (
        <div className={styles.container}>
            <div className={styles.left} >
                <div className={styles.toolbar}>
                    <Input placeholder='请输入'></Input>
                    <Button type='link' onClick={searchHandler}>搜索</Button>
                </div>
                <div className={styles.list}>
                    {list.length > 0 &&
                        list.map((q: any) => {
                            const { _id } = q
                            return <QuestionCard key={_id} {...q}></QuestionCard>
                        })}
                    <div ref={loadRef} className={styles['load-elem']}><LoadMoreElem /></div>
                </div>
            </div>
            <div className={styles.right}>right</div>
        </div>
    );
}

export default Home;
