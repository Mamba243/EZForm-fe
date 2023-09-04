// 组件支持的参数
export type QuestionInputPropsType = {
    title?: string
    placeholder?: string

    answer?: string
    examScore?: number
    onChange?: (newProps: QuestionInputPropsType) => void
    disabled?: boolean
    isRequired?: boolean
}

// 参数默认值
export const DefaultQuestionInputProps = {
    title: '请输入姓名:',
    placeholder: '请输入'
}