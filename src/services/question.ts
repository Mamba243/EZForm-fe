import axios, { ResDataType } from './axios'

type searchOption = {
    keyword: string
    title: string
    type: string
    pageIndex: number
    pageSize: number
    isTpl: boolean
    isDeleted: boolean
}

// 获取问卷列表
export async function getQuestionListService(opt: Partial<searchOption> = {}): Promise<ResDataType> {
    const url = '/api/question'
    const data = (await axios.get(url, { params: opt })) as ResDataType
    return data;
}

// 添加单个问卷
export async function addEmptyQuestionService(): Promise<ResDataType> {
    const url = '/api/question'
    const data = (await axios.post(url)) as ResDataType
    return data;
}

// 复制问卷
export async function copyQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/duplicate/${id}`
    const data = (await axios.post(url)) as ResDataType
    return data;
}


// 获取单个问卷
export async function getQuestionService(id: string): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = (await axios.get(url)) as ResDataType
    return data;
}

// 保存单个问卷
export async function addQuestionService(opt: Partial<searchOption> = {}): Promise<ResDataType> {
    const url = '/235/Questionnaire/Question/InsertQuestion'
    const data = (await axios.post(url, opt)) as ResDataType
    return data;
}

// 更新单个问卷
export async function updateQuestionService(opt: { [key: string]: any }, id?: string,): Promise<ResDataType> {
    const url = `/api/question/${id}`
    const data = (await axios.patch(url, opt)) as ResDataType
    return data;
}

// 彻底删除问卷
export async function deleteQuestionService(ids: string[]): Promise<ResDataType> {
    const url = '/api/question'
    const data = (await axios.delete(url, { data: { ids } })) as ResDataType
    return data
}

// 源数据统计
export async function statRawDataService(questionId: string): Promise<ResDataType> {
    const url = `/api/stat/${questionId}`
    const data = (await axios.get(url)) as ResDataType
    return data;
}

// 源数据删除
export async function statRawDeleteService(id: string): Promise<ResDataType> {
    const url = '/api/stat'
    const data = (await axios.delete(url, { data: { id } })) as ResDataType
    return data;
}

// 报表统计
export async function statChartDataService(questionId: string): Promise<ResDataType> {
    const url = `/api/stat/chart/${questionId}`
    const data = (await axios.get(url)) as ResDataType
    return data;
}
