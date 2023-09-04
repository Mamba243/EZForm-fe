import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ComponentPropsType } from '../../components/QuestionComponents'
import produce from 'immer'
import { arrayMove } from '@dnd-kit/sortable'

export type ComponentInfoType = {
    fe_id: string
    title: string
    type: string
    isHidden?: boolean
    isLocked?: boolean
    props: ComponentPropsType
}

export type ComponentsStateType = {
    selectedId: string
    componentList: Array<ComponentInfoType>
}

export const  INIT_COM_STATE: ComponentsStateType = {
    selectedId: '',
    componentList: []
}

export const componentsSlice: any = createSlice({
    name: 'components',
    initialState: INIT_COM_STATE,
    reducers: {
        resetComponents: (state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) => {
            return action.payload
        },
        
        // 修改选中id
        changeSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            draft.selectedId = action.payload
        }),

        // 往问卷中添加组件
        addComponent: produce((draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
            const newComponent = action.payload
            const { componentList, selectedId } = draft
            const index = componentList.findIndex(c => c.fe_id === selectedId)
            if (index < 0) {
                componentList.push(newComponent)
            } else {
                componentList.splice(index + 1, 0, newComponent)
            }
            if (draft.selectedId == null) return;
        }),

        // 移除组件
        removeSelectedComponent: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
            const { componentList } = draft
            const index = componentList.findIndex(c => c.fe_id === action.payload)
            componentList.splice(index, 1)
        }),

        // 修改组件属性
        changeComponentProps: produce((draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>) => {
            const { fe_id, newProps } = action.payload
            const curComp = draft.componentList.find(c => c.fe_id === fe_id)
            if (curComp) {
                curComp.props = {
                    ...curComp.props,
                    ...newProps
                }
            }
        }),

        // 移动组件
        moveComponent: produce((draft: ComponentsStateType, action: PayloadAction<{ oldIndex: number; newIndex: number }>) => {
            const { componentList: curComponentList } = draft
            const { oldIndex, newIndex } = action.payload
            draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
        }),
    }
})

export const { resetComponents, changeSelectedId, addComponent, removeSelectedComponent, changeComponentProps, moveComponent } = componentsSlice.actions
export default componentsSlice.reducer