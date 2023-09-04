import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRequest } from 'ahooks'
import produce from 'immer'
import { getTplService } from '../services/template'
import { useDispatch } from 'react-redux'
import { resetComponents, INIT_COM_STATE } from "../store/componentsReducer"
import { resetPageInfo, INIT_PAGE_STATE } from '../store/pageInfoReducer'
import dayjs from 'dayjs';

// 获取当前日期
const currentDate = dayjs();

function useLoadTplData(tplId?: string) {
    const { id = '' } = useParams()
    const dispatch = useDispatch()
    const { data, loading, error, run } = useRequest(
        async (id: string) => {
            if (!id) return;
            const data = await getTplService(id)
            return data
        },
        {
            manual: true
        }
    )

    // 根据获取的 data 设置 redux store 
    useEffect(() => {
        if (!data) {
            // 如果没有数据，执行清空操作
            dispatch(resetComponents(INIT_COM_STATE));
            dispatch(resetPageInfo(INIT_PAGE_STATE));
            return;
        }
        const { children, ...pageInfo } = data;
        const componentList = JSON.parse(children);

        // 修改pageInfo的属性，因为模板返回的pageInfo与问卷不同
        delete pageInfo.id
        delete pageInfo.isPublic
        pageInfo.startTime = currentDate.format('YYYY-MM-DD HH:mm')
        pageInfo.endTime = currentDate.endOf('day').format('YYYY-MM-DD HH:mm')

        dispatch(resetComponents({ componentList, selectedId: '' }));
        dispatch(resetPageInfo({ ...pageInfo }));
    }, [data]);

    // 判断 Id 变化，执行 ajax 加载问卷数据
    useEffect(() => {
        run(tplId || id)
    }, [id, tplId])

    return { loading, error }
}

export default useLoadTplData