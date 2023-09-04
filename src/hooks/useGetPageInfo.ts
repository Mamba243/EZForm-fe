import { useSelector } from 'react-redux'
import type { StateType } from '../store'
import type { PageInfoType } from '../store/pageInfoReducer'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

function useGetPageInfo() {
    const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType;
    const { startTime, endTime } = pageInfo

    const start = dayjs(startTime)
    const end = dayjs(endTime)
    const dateRange = [start, end]

    return { ...pageInfo, dateRange }
}

export default useGetPageInfo

