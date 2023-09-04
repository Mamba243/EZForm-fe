import { useRequest } from 'ahooks'
import { getQuestionListService } from '../services/question'
import { useSearchParams } from 'react-router-dom'

type OptionType = {
    isTpl: boolean
    isDeleted: boolean
}

function useLoadQuestionListData(opt: Partial<OptionType>) {
    const { isTpl, isDeleted } = opt
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') || ''
    const type = searchParams.get('type') || ''
    const pageIndex = parseInt(searchParams.get('pageIndex') || '') || 1
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 10

    const { data, run, loading, refresh } = useRequest(
        async () => {
            const data = await getQuestionListService({ title: keyword, pageIndex, pageSize, type, isTpl, isDeleted })
            return data
        },
        {
            refreshDeps: [searchParams], // 刷新的依赖项
        }
    )
    return { data, run, loading, refresh }
}

export default useLoadQuestionListData
