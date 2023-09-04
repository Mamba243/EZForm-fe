import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import produce from 'immer'

export type AnswerInfoType = {
    componentId: string,
    answer: string,
    examScore: number
}

export type SheetInfoType = {
    id: string;
    questionId: string;
    title: string;
    description: string;
    type: number;
    questionTotalScore: number;
    questionScore: number;
    answerTime: string;
    submitName: string;
    ipAddress: string;
    deviceType: string;
    platformType: string;
    browser: string;
    swipingScreenNum: number;
    autoSave: number;
    progressBar: number;
    oneQuestionPerPage: number;
    questionCard: number;
    copyQuestion: number;
    updateAnswer: number;
    children: string;
    answerList: string;
    answerRewrite: Object,
    componentList: Array<any>
};

export const INIT_SHEET_STATE: SheetInfoType = {
    id: '',
    questionId: '',
    title: '',
    description: '',
    type: 0,
    questionTotalScore: 0,
    questionScore: 0,
    answerTime: '',
    submitName: '',
    ipAddress: '',
    deviceType: '',
    platformType: '',
    browser: '',
    swipingScreenNum: 0,
    autoSave: 0,
    progressBar: 0,
    oneQuestionPerPage: 0,
    questionCard: 0,
    copyQuestion: 0,
    updateAnswer: 0,
    children: '',
    answerList: '',
    answerRewrite: {},
    componentList: []
};


const sheetInfoSlice: any = createSlice({
    name: 'pageInfo',
    initialState: INIT_SHEET_STATE,
    reducers: {
        resetSheetInfo: (state: SheetInfoType, action: PayloadAction<SheetInfoType>) => {
            return action.payload
        },
    }
})

export const { resetSheetInfo } = sheetInfoSlice.actions

export default sheetInfoSlice.reducer