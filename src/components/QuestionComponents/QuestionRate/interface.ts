export type QuestionRatePropsType = {
    title?: string
    rate?: number
    count?: number
    allowHalf?: boolean
    character?: string
    isRequired?: boolean
    onChange?: (newProps: QuestionRatePropsType) => void
}

export const DefaultQuestionRateProps = {
    title: '请为我们的服务作出评价:',
    // rate: 4,
    count: 5,
    allowHalf: true,
    character: 'star'
}