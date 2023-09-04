export type QuestionTitlePropsType = {
    level?: 1 | 2 | 3 | 4 | 5
    title?: string
    isCenter?: boolean

    onChange?: (newProps: QuestionTitlePropsType) => void
    disabled?: boolean
}

// 默认配置
export const DefaultQuestionTitleProps: QuestionTitlePropsType = {
    level: 5,
    title: '单行标题',
    isCenter: false,
}
