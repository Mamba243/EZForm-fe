import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type AnswerInfoType = {
    componentId: string
    answer: string
    examScore: number
}

export type PageInfoType = {
    title: string
    description?: string
    type?: number
    questionTotalScore?: number
    questionStatus?: number
    autoSave?: number
    progressBar?: number
    oneQuestionPerPage?: number
    questionCard?: number
    copyQuestion?: number
    updateAnswer?: number
    ipLimitation?: string
    dateRange?: Array<any>
    startTime?: string
    endTime?: string
    submitLongTime?: string
    submitShortTime?: string
    swipingScreenMaxNum?: number
    correctAnswer?: Array<AnswerInfoType>
}

export const INIT_PAGE_STATE: PageInfoType = {
    title: '默认问卷',
    description: '',
    type: 0,
    questionStatus: 0,
    autoSave: 0,
    submitLongTime: '120',
    submitShortTime: '30',
    correctAnswer: []
}

const pageInfoSlice: any = createSlice({
    name: 'pageInfo',
    initialState: INIT_PAGE_STATE,
    reducers: {
        resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => {
            return action.payload
        },
    }
})

export const { resetPageInfo } = pageInfoSlice.actions

export default pageInfoSlice.reducer