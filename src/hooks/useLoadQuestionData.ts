import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useRequest } from 'ahooks'
import produce from 'immer'
import { getQuestionService } from '../services/question'
import { useDispatch } from 'react-redux'
import { resetComponents, INIT_COM_STATE } from "../store/componentsReducer"
import { resetPageInfo, INIT_PAGE_STATE } from '../store/pageInfoReducer'

function useLoadQuestionData() {
    const { id = '' } = useParams()
    const dispatch = useDispatch()
    const { data, loading, error, run } = useRequest(
        async (id: string) => {
            if (!id) return;
            const data = await getQuestionService(id)
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

        // const updatedComponentList = produce(componentList, (draft: any) => {
        //     correctAnswer.forEach((answerItem: any) => {
        //         const { componentId, answer, examScore } = answerItem;
        //         if (answer != null) {
        //             const component: any = draft.find((c: any) => c.fe_id === componentId);
        //             if (component) {
        //                 component.props.answer = answer;
        //                 component.props.examScore = examScore;
        //             }
        //         }
        //     });
        // });

        dispatch(resetComponents({ componentList, selectedId: '' }));
        dispatch(resetPageInfo({ ...pageInfo }));
    }, [data]);

    // 判断 Id 变化，执行 ajax 加载问卷数据
    useEffect(() => {
        run(id)
    }, [id])

    return { loading, error }
}

export default useLoadQuestionData