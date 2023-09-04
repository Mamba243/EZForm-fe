import axios, { ResDataType } from './axios'

type searchOption = {
    title: string
    type: number
    pageIndex: number
    pageSize: number
}

type sheetParamsOption = {
    id: string
    answerStatus: number
    questionId: string
    answerList: string
}


// 客户端获取发布的问卷列表
export async function getClientQuestionListService(opt: Partial<searchOption> = {}): Promise<ResDataType> {
    const url = '/235/Questionnaire/Question/GetUserQuestion'
    const data = (await axios.get(url, { params: opt })) as ResDataType
    return data;
}

// 客户端获取问卷
export async function getClientQuestionService(id: string): Promise<ResDataType> {
    const url = '/235/Questionnaire/Answer/InsertAnswer'
    const data = (await axios.post(url, id)) as ResDataType
    return data;
}

// 客户端获取最后一次提交的问卷
export async function getClientLastQuestionService(opt: Partial<any> = {}): Promise<ResDataType> {
    const url = '/235/Questionnaire/Answer/GetUserLastAnswer'
    const data = (await axios.get(url, { params: opt })) as ResDataType
    return data;
}

// 客户端提交问卷
export async function saveClientQuestionService(opt: Partial<sheetParamsOption> = {}): Promise<ResDataType> {
    const url = '/235/Questionnaire/Answer/AnswerSubmit'
    const data = (await axios.post(url, opt)) as ResDataType
    return data;
}

