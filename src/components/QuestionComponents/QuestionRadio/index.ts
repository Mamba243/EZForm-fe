
import QuestionRadio from './Component'
import PropsComponent from './PropsComponent'
import FormComponent from './FormComponent'
import StatComponent from './StatComponent'
import { DefaultQuestionRadioProps } from './interface'
export * from './interface'

// 组件配置对象 包括组件本身、参数组件、默认值
const QuestionRadioConf = {
    title: '单选按钮',
    type: 'questionRadio',
    Component: QuestionRadio,
    FormComponent: FormComponent,
    PropsComponent: PropsComponent,
    StatComponent: StatComponent,
    defaultProps: DefaultQuestionRadioProps
}

export default QuestionRadioConf
