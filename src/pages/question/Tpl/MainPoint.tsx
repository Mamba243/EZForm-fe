import { FC } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import styles from './MainPoint.module.scss'
import SortableContainer from '../../../components/DndComponent/SortableContainer'
import SortableItem from '../../../components/DndComponent/SortableItem'
import { useDispatch } from 'react-redux'
import {
    moveComponent,
} from '../../../store/componentsReducer'
interface MainPointProps {

}


const MainPoint: FC<MainPointProps> = () => {
    const { componentList = [] } = useGetComponentInfo()
    const dispatch = useDispatch()

    // SortableContainer 组件的 items 属性，需要每个 item 都有 id
    const componentListWithId = componentList.map(c => {
        return { ...c, id: c.fe_id }
    })

    // 拖拽排序结束
    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({ oldIndex, newIndex }))
    }
    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
            <div style={{ margin: '0 12px' }}>
                {
                    componentList.map((c, index) => {
                        const { title, props = {}, fe_id } = c
                        return (
                            <SortableItem key={fe_id} id={fe_id}>
                                <div className={styles.wrapper}>
                                    <span>
                                        <span>{index + 1}、</span>
                                        <span>{props.title}</span>
                                    </span>
                                    {/* <span>[{title}]</span> */}
                                </div>
                            </SortableItem>
                        )
                    })
                }
            </div>
        </SortableContainer>
    );
}

export default MainPoint;