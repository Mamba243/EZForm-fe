import { useRequest } from 'ahooks'
import { getTplListService } from '../services/template'
import { useSearchParams } from 'react-router-dom'

function useLoadTplListData() {
    const [searchParams] = useSearchParams()
    const keyword = searchParams.get('keyword') || ''
    const pageIndex = parseInt(searchParams.get('pageIndex') || '') || 1
    const pageSize = parseInt(searchParams.get('pageSize') || '') || 10

    const { data, run, loading, refresh } = useRequest(
        async () => {
            const data = await getTplListService({ title: keyword, pageIndex, pageSize })
            return data
        },
        {
            refreshDeps: [searchParams], // 刷新的依赖项
        }
    )
    return { data, run, loading, refresh }
}

export default useLoadTplListData
