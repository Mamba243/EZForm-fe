export type QuestionJudgePropsType = {
    title?: string
    isVertical?: boolean

    answer?: string
    examScore?: number
    onChange?: (newProps: QuestionJudgePropsType) => void
    disabled?: boolean
    isRequired?: boolean
}

export const DefaultQuestionJudgeProps = {
    title: '台湾属于中国的:',
    isVertical: false,
}

// 统计组件的属性类型
export type QuestionJudgeStatPropsType = {
    stat: Array<{ value: string; label: string, subtotal: number, scale: number }>
}
