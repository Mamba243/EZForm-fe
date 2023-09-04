import QuestionCheckbox from './Component'
import PropsComponent from './PropsComponent'
import FormComponent from './FormComponent'
import StatComponent from './StatComponent'
import { DefaultQuestionCheckboxProps } from './interface'
export * from './interface'

// 组件配置对象 包括组件本身、参数组件、默认值
const QuestionCheckboxConf = {
    title: '多选按钮',
    type: 'questionCheckbox',
    Component: QuestionCheckbox,
    FormComponent: FormComponent,
    PropsComponent: PropsComponent,
    StatComponent: StatComponent,
    defaultProps: DefaultQuestionCheckboxProps
}

export default QuestionCheckboxConf
