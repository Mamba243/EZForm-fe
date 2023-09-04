export type QuestionInfoPropsType = {
    title?: string
    desc?: string

    onChange?: (newProps: QuestionInfoPropsType) => void
}

export const DefaultQuestionInfoProps = {
    title: '调查问卷',
    desc: '感谢您能抽出几分钟时间来参加本次答题，现在我们就马上开始吧！'
}