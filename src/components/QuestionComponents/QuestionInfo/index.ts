import QuestionInfo from './Component'
import PropsComponent from './PropsComponent'
import FormComponent from './FormComponent'
import { DefaultQuestionInfoProps } from './interface'
export * from './interface'

const QuestionInfoConf = {
    title: '问卷信息',
    type: 'questionInfo',
    Component: QuestionInfo,
    FormComponent: FormComponent,
    PropsComponent: PropsComponent,
    defaultProps: DefaultQuestionInfoProps
}
export default QuestionInfoConf