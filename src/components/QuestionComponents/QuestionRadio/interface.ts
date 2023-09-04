export type OptionType = {
    label: string,
    value: string | number
}

export type QuestionRadioPropsType = {
    title?: string
    isVertical?: boolean
    options?: Array<OptionType>
    value?: string | number

    answer?: string
    examScore?: number
    onChange?: (newProps: QuestionRadioPropsType) => void
    disabled?: boolean
    isRequired?: boolean
}

export const DefaultQuestionRadioProps = {
    title: '选择下列一项:',
    isVertical: false,
    options: [
        { label: '选项1', value: 1 },
        { label: '选项2', value: 2 },
        { label: '选项3', value: 3 },
    ]
} as QuestionRadioPropsType

// 统计组件的属性类型
export type QuestionRadioStatPropsType = {
    stat: Array<{ value: string; label: string, subtotal: number, scale: number }>
}
