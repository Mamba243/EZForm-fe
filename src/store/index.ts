import { configureStore } from '@reduxjs/toolkit'
import userReducer, { UserStateType } from './userReducer'
import componentsReducer, { ComponentsStateType } from './componentsReducer'
import pageInfoReducer, { PageInfoType } from './pageInfoReducer'
import sheetInfoReducer, { SheetInfoType } from './sheetInfoReducer'

export type StateType = {
    user: UserStateType
    components: ComponentsStateType
    pageInfo: PageInfoType
    sheetInfo: SheetInfoType
}

export default configureStore({
    reducer: {
        // 用户信息
        user: userReducer,
        // 组件列表信息
        components: componentsReducer,
        // 问卷信息
        pageInfo: pageInfoReducer,
        // 答卷信息
        sheetInfo: sheetInfoReducer
    }
})