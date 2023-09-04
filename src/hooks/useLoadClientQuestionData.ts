import { useEffect } from "react"
import { useRequest } from 'ahooks'
import { useParams } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { getClientQuestionService, getClientLastQuestionService } from '../services/client'
import { resetSheetInfo } from '../store/sheetInfoReducer'
import {toObjectFormat} from '../utils/AnswerListAdaptor'

function useLoadClientQuestionData() {
    const { id = '' } = useParams()
    const status = localStorage.getItem('status') || ''
    const dispatch = useDispatch()

    const { data, loading, error, run } = useRequest(
        async (id: string) => {
            // 根据不同的类型请求不同接口回显数据 
            const data = (
                status === '1' ?
                    await getClientQuestionService(id) :
                    await getClientLastQuestionService({ questionId: id })
            )
            
            return data
        },
        {
            manual: true
        }
    )

    // 根据获取的 data 设置 redux store 
    useEffect(() => {
        if (!data) return;
        const sheetInfo = data.data
        const { children, answerList, ...info } = sheetInfo
        const componentList = JSON.parse(children)
        const answerRewrite = toObjectFormat(JSON.parse(answerList))
        dispatch(resetSheetInfo({ componentList, answerRewrite, ...info }))
    }, [data]);

    // 判断 Id 变化，执行 ajax 加载问卷数据
    useEffect(() => {
        run(id)
    }, [id])

    return { loading, error }
}

export default useLoadClientQuestionData
