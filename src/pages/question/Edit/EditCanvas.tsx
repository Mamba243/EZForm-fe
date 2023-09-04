import { FC, MouseEvent, useState } from "react"
import { useDispatch } from 'react-redux'
import { ComponentInfoType, changeSelectedId, removeSelectedComponent, moveComponent } from "../../../store/componentsReducer/index"
import { Spin, Button } from 'antd'
import styles from './EditCanvas.module.scss'
import classnames from 'classnames'
import { getComponentConfByType } from '../../../components/QuestionComponents/index'
import useGetComponentInfo from "../../../hooks/useGetComponentInfo"
import { ArrowUpOutlined, ArrowDownOutlined, VerticalAlignTopOutlined, DeleteOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import SortableContainer from '../../../components/DndComponent/SortableContainer'
import SortableItem from '../../../components/DndComponent/SortableItem'

interface EditCanvasProps {
    loading: boolean
}

function getComponent(componentInfo: ComponentInfoType) {
    const { type, props } = componentInfo
    const componentConf = getComponentConfByType(type)
    if (componentConf == null) return null

    const { Component } = componentConf
    return <Component {...props} />
}

const EditCanvas: FC<EditCanvasProps> = ({ loading }) => {
    const { componentList = [], selectedId } = useGetComponentInfo()
    const [showDeleteIcon, setShowDeleteIcon] = useState(false)
    const [hoverId, setHoverId] = useState('')
    const selectedIndex = componentList.findIndex(c => c.fe_id === hoverId)

    const dispatch = useDispatch()

    // 点击组件
    const handleClick = (e: MouseEvent, id: string) => {
        e.stopPropagation();
        dispatch(changeSelectedId(id))
    }

    // 删除组件
    const handleDelete = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch(removeSelectedComponent(hoverId))
    }

    // 上移组件
    const handleMoveTop = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: 0 }))
    }

    // 上移组件
    const handleMoveUp = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex - 1 }))
    }

    // 下移组件
    const handleMoveDown = (e: MouseEvent) => {
        e.stopPropagation();
        dispatch(moveComponent({ oldIndex: selectedIndex, newIndex: selectedIndex + 1 }))
    }

    // 处理鼠标移入事件
    const handleMouseEnter = (e: MouseEvent, hoverId: string) => {
        setHoverId(hoverId)
        setShowDeleteIcon(true);
    };

    // 处理鼠标移出事件
    const handleMouseLeave = () => {
        setShowDeleteIcon(false);
    };

    // SortableContainer 组件的 items 属性，需要每个 item 都有 id
    const componentListWithId = componentList.map(c => {
        return { ...c, id: c.fe_id }
    })

    // 拖拽排序结束
    function handleDragEnd(oldIndex: number, newIndex: number) {
        dispatch(moveComponent({ oldIndex, newIndex }))
    }

    if (loading) return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Spin></Spin>
        </div>
    )
    const isMask = componentList.length ? false : true;

    return (
        <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>

            < div className={classNames(styles.canvas, isMask ? styles.mask : '')}>
                {isMask ?
                    <div className={styles.tips}>点击题型 或 把题型拖入此区域</div> :
                    componentList.map((c: any, index: number) => {
                        const defaultClassName = styles['component-wrapper']
                        const selectedClassName = styles.selected
                        const wrapperClassName = classnames({
                            [defaultClassName]: true,
                            [selectedClassName]: c.fe_id === selectedId
                        })

                        const defaultBarClassName = styles.bar

                        // TODO：选择出现删除遮罩效果
                        const barClassName = classnames({
                            [defaultBarClassName]: true,
                        })

                        return (
                            <SortableItem key={c.fe_id} id={c.fe_id}>
                                <div className={wrapperClassName} key={c.fe_id} onClick={e => handleClick(e, c.fe_id)}>
                                    <div className={styles.component} onMouseEnter={(e: MouseEvent) => handleMouseEnter(e, c.fe_id)} onMouseLeave={handleMouseLeave}>
                                        <div className={styles.content}>
                                            {/* TODO:系统题号 */}
                                            {/* <span style={{fontSize:'14px',color:'#999BA1',position:'absolute',top:'16px',left:'2px'}}>{index + 1}</span> */}
                                            {getComponent(c)}
                                        </div>
                                        {showDeleteIcon && c.fe_id === hoverId ?
                                            <div className={barClassName}>
                                                <Button onClick={e => handleMoveTop(e)} size="small" type="link" style={{ color: '#999BA1' }}  ><VerticalAlignTopOutlined /></Button>
                                                <Button onClick={e => handleMoveUp(e)} size="small" type="link" style={{ color: '#999BA1' }}><ArrowUpOutlined /></Button>
                                                <Button onClick={e => handleMoveDown(e)} size="small" type="link" style={{ color: '#999BA1' }}><ArrowDownOutlined /></Button>
                                                <Button onClick={e => handleDelete(e)} size="small" type="link" style={{ color: '#999BA1' }}><DeleteOutlined /></Button>
                                            </div> : ''}
                                    </div>
                                </div>
                            </SortableItem>
                        )
                    })}
            </ div>
        </SortableContainer>
    )
}

export default EditCanvas;