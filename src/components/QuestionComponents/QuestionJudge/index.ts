
import QuestionJudge from './Component'
import PropsComponent from './PropsComponent'
import FormComponent from './FormComponent'
import StatComponent from './StatComponent'
import { DefaultQuestionJudgeProps } from './interface'
export * from './interface'

// 组件配置对象 包括组件本身、参数组件、默认值
const QuestionJudgeConf = {
    title: '判断题',
    type: 'questionJudge',
    Component: QuestionJudge,
    FormComponent: FormComponent,
    PropsComponent: PropsComponent,
    StatComponent: StatComponent,
    defaultProps: DefaultQuestionJudgeProps
}

export default QuestionJudgeConf
