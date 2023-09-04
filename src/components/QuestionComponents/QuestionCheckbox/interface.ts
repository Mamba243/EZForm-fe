export type CheckboxOptionType = {
    label: string,
    value: string | number,
    checked: boolean
}

export type QuestionCheckboxPropsType = {
    title?: string
    isVertical?: boolean
    options?: Array<CheckboxOptionType>

    answer?: string
    examScore?: number
    onChange?: (newProps: QuestionCheckboxPropsType) => void
    disabled?: boolean
    isRequired?: boolean
}

export const DefaultQuestionCheckboxProps = {
    title: '选择下列几项:',
    isVertical: false,
    options: [
        { label: '选项1', value: 1, checked: false },
        { label: '选项2', value: 2, checked: false },
        { label: '选项3', value: 3, checked: false },
    ]
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
    stat: Array<{ value: string; label: string, subtotal: number, scale: number }>
}
