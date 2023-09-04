import axios, { ResDataType } from './axios'

type searchOption = {
    keyword: string
    title: string
    type: number
    pageIndex: number
    pageSize: number
}

// 获取模板列表
export async function getTplListService(opt: Partial<searchOption> = {}): Promise<ResDataType> {
    const url = '/api/template'
    const data = (await axios.get(url, { params: opt })) as ResDataType
    return data;
}

// 获取单个模板
export async function getTplService(id: string): Promise<ResDataType> {
    const url = `/api/template/${id}`
    const data = (await axios.get(url)) as ResDataType
    return data;
}

// 保存模板
export async function addTplService(opt: Partial<searchOption> = {}): Promise<ResDataType> {
    const url = '/api/template'
    const data = (await axios.post(url, opt)) as ResDataType
    return data;
}

// 删除模板
export async function deleteTplService(id: string): Promise<ResDataType> {
    const url = '/api/template'
    const data = (await axios.delete(url, { data: { id } })) as ResDataType
    return data;
}

