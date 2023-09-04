import QuestionInput from './Component'
import PropsComponent from './PropsComponent'
import FormComponent from './FormComponent'
import { DefaultQuestionInputProps } from './interface'
export * from './interface'

// 组件配置对象 包括组件本身、参数组件、默认值
const QuestionInputConf = {
    title: '输入框',
    type: 'questionInput',
    Component: QuestionInput,
    FormComponent: FormComponent,
    PropsComponent: PropsComponent,
    defaultProps: DefaultQuestionInputProps
}

export default QuestionInputConf