import QuestionRate from './Component'
import PropsComponent from './PropsComponent'
import FormComponent from './FormComponent'
import { DefaultQuestionRateProps } from './interface'
export * from './interface'

const QuestionRateConf = {
    title: '评分',
    type: 'questionRate',
    Component: QuestionRate,
    FormComponent: FormComponent,
    PropsComponent: PropsComponent,
    defaultProps: DefaultQuestionRateProps
}
export default QuestionRateConf
